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
  
  // Extract the top 3 closest players
  const top3 = sortedPlayers.slice(0, 3);
  
  // Maintain the original order among the top 3 closest players
  const originalTop3 = players.filter(player => top3.includes(player));
  
  return originalTop3;
  }

drawItems(context, canvas, players, devMode, alreadyFilteredPlayers, filteredGuilds, filteredAlliances) {
  const canvasHeight = 500;
  const canvasWidth = 1200;
  const gap = 2;
  const playerBoxHeight = Math.floor((canvasHeight - 2 * gap) / 3);
  const playerBoxWidth = canvasWidth;
  const itemSize = 110; // Increased item icon size
  const itemGap = -12; // Small gap between items

  const sortedPlayers = players.length > 0 ? this.sortPlayersByDistance(players) : [];

  // Always draw 3 boxes
  for (let i = 0; i < 3; i++) {
    const playerOne = sortedPlayers[i] || null;
    const posY = i * (playerBoxHeight + gap);

    // Draw player box background
    context.fillStyle = "rgba(0, 0, 0, 0.5)";
    context.fillRect(0, posY, playerBoxWidth, playerBoxHeight);

    if (playerOne) {
      // Skip filtered players
      if (filteredGuilds.find((name) => name === playerOne.guildName.toUpperCase()) || 
          filteredAlliances.find((name) => name === playerOne.alliance.toUpperCase()) || 
          alreadyFilteredPlayers.find((name) => name === playerOne.nickname.toUpperCase())) {
        continue;
      }

      // Draw player information
      let posX = 15;
      
      // Draw flag
      const flagId = playerOne.flagId || 0;
      const flagName = FactionFlagInfo[flagId];
      this.DrawCustomImage(context, posX, posY + 22, flagName, "Flags", 25);
	
      // Draw player name
      this.drawTextItems(posX + 15, posY + 27, playerOne.nickname, context, "18px", "white");
      
      // Draw player HP
      this.drawTextItems(410, posY + 27, `${playerOne.currentHealth}/${playerOne.initialHealth}`, context, "16px", "red");

      // Draw items
      posX = 55;
      let itemPosY = posY + 95;
      const items = playerOne.items;
      let itemCount = 0;

      if (items && items["type"] !== "Buffer") {
        for (const item of items) {
          if (itemCount >= 5) {
            break; // Stop after displaying 5 items
          }
          
          const itemInfo = this.itemsInfo[item];
          if (itemInfo != undefined && this.settings.GetPreloadedImage(itemInfo, "Items") !== null) {
            this.DrawCustomImage(context, posX, itemPosY, itemInfo, "Items", itemSize);
            posX += itemSize + itemGap;
            itemCount++;
            
            if (posX > playerBoxWidth - itemSize) {
              posX = 15;
              itemPosY += itemSize + itemGap;
            }
          }
        }
      }
    }
    // If there's no player, we just leave the box empty
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
