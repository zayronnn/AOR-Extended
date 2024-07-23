export class PlayersDrawing extends DrawingUtils {
    constructor(Settings) {
        super(Settings);
        this.itemsInfo = {};
    }

    updateItemsInfo(newData) {
        this.itemsInfo = newData;
    }

    sortPlayersByDistance(players) {
        // Sort all players by their distance
        const sortedPlayers = players.slice().sort((a, b) => a.distance - b.distance);

        // Extract the top 8 closest players
        const top8 = sortedPlayers.slice(0, 8);

        // Maintain the original order among the top 8 closest players
        const originalTop8 = players.filter(player => top8.includes(player));

        // Get the rest of the players, excluding the original top 8
        const rest = sortedPlayers.slice(8);

        // Combine the original top 8 with the sorted rest
        return originalTop8.concat(rest);
    }

    drawItems(context, canvas, players, devMode, alreadyFilteredPlayers, filteredGuilds, filteredAlliances) {
        const canvasHeight = 500; // Total canvas height
        const canvasWidth = 500;
        const gap = 2;
        const playerBoxHeight = Math.floor((canvasHeight - (gap * 9)) / 8); // Adjusted for 8 players with gaps
        const playerBoxWidth = canvasWidth;
        const itemSize = 60; // Increased item icon size
        const itemGap = 5; // Small gap between items

        const sortedPlayers = players.length > 0 ? this.sortPlayersByDistance(players) : [];

        // Draw player box backgrounds first
        context.fillStyle = "rgba(128, 128, 128, 0.1)";
        for (let i = 0; i < 8; i++) {
            const posY = i * (playerBoxHeight + gap) + gap; // Adjusted to account for gap at the top
            context.fillRect(0, posY, playerBoxWidth, playerBoxHeight);
        }

        // Draw player information on top of the backgrounds
        for (let i = 0; i < 8; i++) {
            const playerOne = sortedPlayers[i] || null;
            const posY = i * (playerBoxHeight + gap) + gap; // Adjusted to account for gap at the top

            if (playerOne) {
                // Skip filtered players
                const isFiltered = filteredGuilds.find(name => name === playerOne.guildName.toUpperCase()) ||
                    filteredAlliances.find(name => name === playerOne.alliance.toUpperCase()) ||
                    alreadyFilteredPlayers.find(name => name === playerOne.nickname.toUpperCase());

                if (isFiltered) continue;

                let posX = 15;

                // Draw flag
                const flagId = playerOne.flagId || 0;
                const flagName = FactionFlagInfo[flagId];
                this.DrawCustomImage(context, posX, posY + 22, flagName, "Flags", 25);

                // Draw player name
                this.drawTextItems(posX + 15, posY + 27, playerOne.nickname, context, "15px", "white");

                // Draw player HP
                this.drawTextItems(posX + 15, posY + 47, `${playerOne.currentHealth}/${playerOne.initialHealth}`, context, "16px", "red");

                // Draw items
                posX = 170;
                let itemPosY = posY + 31; // Adjusted for correct positioning
                const items = playerOne.items;

                if (items && items["type"] !== "Buffer") {
                    for (let itemCount = 0; itemCount < 5 && itemCount < items.length; itemCount++) {
                        const itemInfo = this.itemsInfo[items[itemCount]];
                        if (itemInfo && this.settings.GetPreloadedImage(itemInfo, "Items") !== null) {
                            this.DrawCustomImage(context, posX, itemPosY, itemInfo, "Items", itemSize);
                            posX += itemSize + itemGap;

                            if (posX > playerBoxWidth - itemSize) {
                                posX = 15;
                                itemPosY += itemSize + itemGap;
                            }
                        }
                    }
                }
            }
        }
    }

    interpolate(players, lpX, lpY, t) {
        for (const playerOne of players) {
            const hX = -1 * playerOne.posX + lpX;
            const hY = playerOne.posY - lpY;
            let distance = Math.round(
                Math.sqrt(
                    (playerOne.posX - lpX) * (playerOne.posX - lpX) +
                    (playerOne.posY - lpY) * (playerOne.posY - lpY)
                )
            );
            playerOne.distance = distance;
            if (playerOne.hY == 0 && playerOne.hX == 0) {
                playerOne.hX = hX;
                playerOne.hY = hY;
            }

            playerOne.hX = this.lerp(playerOne.hX, hX, t);
            playerOne.hY = this.lerp(playerOne.hY, hY, t);
        }
    }

    invalidate(context, players, alreadyFilteredPlayers, filteredGuilds, filteredAlliances) {
        const showFilteredPlayers = this.settings.returnLocalBool("settingDrawFilteredPlayers");
        const showFilteredGuilds = this.settings.returnLocalBool("settingDrawFilteredGuilds");
        const showFilteredAlliances = this.settings.returnLocalBool("settingDrawFilteredAlliances");

        for (const playerOne of players) {
            const point = this.transformPoint(playerOne.hX, playerOne.hY);
            let space = 0;

            if (!showFilteredGuilds && filteredGuilds.find((name) => name === playerOne.guildName.toUpperCase()))
                continue;
            if (!showFilteredAlliances && filteredAlliances.find((name) => name === playerOne.alliance.toUpperCase()))
                continue;
            if (!showFilteredPlayers && alreadyFilteredPlayers.find((name) => name === playerOne.nickname.toUpperCase()))
                continue;

            const flagId = playerOne.flagId || 0;
            const flagName = FactionFlagInfo[flagId];

            // Check if the player is part of filtered guilds/alliances/players
            let isFiltered = false;
            let iconName = '';

            if (filteredGuilds.find((name) => name === playerOne.guildName.toUpperCase())) {
                isFiltered = true;
                iconName = 'guild';
            } else if (filteredAlliances.find((name) => name === playerOne.alliance.toUpperCase())) {
                isFiltered = true;
                iconName = 'alliance';
            } else if (alreadyFilteredPlayers.find((name) => name === playerOne.nickname.toUpperCase())) {
                isFiltered = true;
                iconName = 'player';
            }

            // Draw the status circle for mounted/unmounted status
            if (this.settings.settingMounted) {
                context.beginPath();
                context.arc(point.x, point.y, 11, 0, 2 * Math.PI, false); // Adjust the circle position and radius as needed
                context.strokeStyle = playerOne.mounted ? 'green' : 'red';
                context.lineWidth = 3;
                context.stroke();
            }

            if (isFiltered) {
                // Draw the custom icon for filtered players
                this.DrawCustomImage(context, point.x, point.y, iconName, "Flags", 20); // Adjust the icon position and size as needed
            } else {
                // Draw the status icon for unfiltered players
                this.DrawCustomImage(context, point.x, point.y, flagName, "Flags", 20);
            }

            if (this.settings.settingNickname) {
                space = space + 23;
                this.drawText(point.x, point.y + space, playerOne.nickname, context);
            }
            if (this.settings.settingDistance) {
                this.drawText(point.x, point.y - 14, playerOne.distance + "m", context);
            }

            if (this.settings.settingHealth) {
                space = space + 6;

                const percent = playerOne.currentHealth / playerOne.initialHealth;
                let width = 60;
                let height = 7;

                context.fillStyle = "#121317";
                context.fillRect(
                    point.x - width / 2,
                    point.y - height / 2 + space,
                    width,
                    height
                );

                context.fillStyle = "red";
                context.fillRect(
                    point.x - width / 2,
                    point.y - height / 2 + space,
                    width * percent,
                    height
                );
            }
            if (this.settings.settingGuild) {
                space = space + 14;

                if (playerOne.guildName != "undefined") {
                    this.drawText(point.x, point.y + space, playerOne.guildName, context);
                }
            }
        }
    }
}