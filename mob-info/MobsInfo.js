//import { EnemyType } from '../scripts/Handlers/EnemyType.js';

export async function GetMobList()
{        
    let resp = undefined;

    /*try {
        if (!File.exists('./scripts/Handlers/mobs.json'))
            throw Error();

        resp = await fetch('./scripts/Handlers/mobs.json');
        resp = await resp.json();
        console.log("Using custom mobs infos");
    } catch (e) {
        try {
            resp = await fetch('./mob-info/mobs.json');
            resp = await resp.json();
        } catch (error) {}
    }*/

    try {
        resp = await fetch('./mob-info/mobs.json');
        resp = await resp.json();
    } catch (error) {}

    var mobList = {};

    if (resp == undefined)
        return mobList;
   

    function addItem(id, tier, type, loc)
    {
        if (!mobList[id])
            mobList[id] = [];
        else
            return;

        mobList[id][0] = tier;
        mobList[id][1] = type;
        mobList[id][2] = loc;
    }
    
    for (const [key, value] of Object.entries(resp.mobs))
    {
        addItem(parseInt(key), value[0], value[1], value[2]);
    }

    /*
    //#region Hide        
    // Steppe biome
    addItem(350, 1, EnemyType.LivingSkinnable, "hide"); // Marmot
    addItem(351, 2, EnemyType.LivingSkinnable, "hide"); // Impala
    addItem(352, 3, EnemyType.LivingSkinnable, "hide"); // Moabird
    addItem(353, 4, EnemyType.LivingSkinnable, "hide"); // Giant stag
    addItem(354, 5, EnemyType.LivingSkinnable, "hide"); // Terrorbird
    addItem(355, 6, EnemyType.LivingSkinnable, "hide"); // Hyena
    addItem(356, 7, EnemyType.LivingSkinnable, "hide"); // Rhino
    addItem(357, 7, EnemyType.LivingSkinnable, "hide"); // Bighorn Rhino
    addItem(358, 8, EnemyType.LivingSkinnable, "hide"); // Mammoth
    addItem(359, 8, EnemyType.LivingSkinnable, "hide"); // Ancient Mammoth

    // Steppe biome treasure
    addItem(360, 4, EnemyType.LivingSkinnable, "hide"); // T4_MOB_TREASURE_HIDE_STEPPE_GIANTSTAG
    addItem(361, 5, EnemyType.LivingSkinnable, "hide"); // T5_MOB_TREASURE_TERRORBIRD
    addItem(362, 6, EnemyType.LivingSkinnable, "hide"); // T6_MOB_TREASURE_DESERTWOLF
    addItem(363, 7, EnemyType.LivingSkinnable, "hide"); // T7_MOB_TREASURE_RHINO
    addItem(364, 8, EnemyType.LivingSkinnable, "hide"); // T8_MOB_TREASURE_ANCIENTMAMMOTH

    addItem(439, 3, EnemyType.LivingSkinnable, "hide"); // Cougar
    addItem(440, 5, EnemyType.LivingSkinnable, "hide"); // Cougar
    addItem(441, 7, EnemyType.LivingSkinnable, "hide"); // Cougar

    // Highland
    addItem(372, 1, EnemyType.LivingSkinnable, "hide"); // Rabbit
    addItem(373, 1, EnemyType.LivingSkinnable, "hide"); // Marmot

    // Forest biome 
    addItem(322, 1, EnemyType.LivingSkinnable, "hide"); // Rabbit
    addItem(323, 2, EnemyType.LivingSkinnable, "hide"); // Fox
    addItem(324, 2, EnemyType.LivingSkinnable, "hide"); // Fox tutorial
    addItem(325, 3, EnemyType.LivingSkinnable, "hide"); // Wolf
    addItem(326, 4, EnemyType.LivingSkinnable, "hide"); // Boar
    addItem(327, 5, EnemyType.LivingSkinnable, "hide"); // Bear
    addItem(328, 6, EnemyType.LivingSkinnable, "hide"); // Direwolf
    addItem(329, 6, EnemyType.LivingSkinnable, "hide"); // Giant Stag
    addItem(330, 7, EnemyType.LivingSkinnable, "hide"); // Direboar small
    addItem(331, 7, EnemyType.LivingSkinnable, "hide"); // Direboar
    addItem(332, 8, EnemyType.LivingSkinnable, "hide"); // Direbear small
    addItem(333, 8, EnemyType.LivingSkinnable, "hide"); // Direbear

    // Forest biome treasure
    addItem(334, 4, EnemyType.LivingSkinnable, "hide"); // T4_MOB_TREASURE_BOAR
    addItem(335, 5, EnemyType.LivingSkinnable, "hide"); // T5_MOB_TREASURE_BEAR
    addItem(336, 6, EnemyType.LivingSkinnable, "hide"); // T6_MOB_TREASURE_DIREWOLF
    addItem(337, 7, EnemyType.LivingSkinnable, "hide"); // T7_MOB_TREASURE_DIREBOAR
    addItem(338, 8, EnemyType.LivingSkinnable, "hide"); // T8_MOB_TREASURE_DIREBEAR

    // Swamp biome
    addItem(339, 1, EnemyType.LivingSkinnable, "hide"); // Toad
    addItem(340, 2, EnemyType.LivingSkinnable, "hide"); // Snake
    addItem(341, 3, EnemyType.LivingSkinnable, "hide"); // Giant toad
    addItem(342, 4, EnemyType.LivingSkinnable, "hide"); // Monitor lizard
    addItem(343, 5, EnemyType.LivingSkinnable, "hide"); // Giant snake
    addItem(344, 6, EnemyType.LivingSkinnable, "hide"); // Dragon
    addItem(345, 7, EnemyType.LivingSkinnable, "hide"); // Marabou
    addItem(346, 8, EnemyType.LivingSkinnable, "hide"); // Alligator

    // Swamp biome treasure
    addItem(347, 4, EnemyType.LivingSkinnable, "hide"); // T4_MOB_TREASURE_HIDE_SWAMP_MONITORLIZARD
    addItem(348, 5, EnemyType.LivingSkinnable, "hide"); // T5_MOB_TREASURE_GIANTSNAKE
    addItem(349, 6, EnemyType.LivingSkinnable, "hide"); // T6_MOB_TREASURE_DRAGON

    // Roads // TODO
    /*addItem(322, 1, EnemyType.LivingSkinnable, "hide"); // SALAMANDER
    addItem(323, 3, EnemyType.LivingSkinnable, "hide"); // STAG
    addItem(324, 4, EnemyType.LivingSkinnable, "hide"); // DIREWOLF
    addItem(325, 5, EnemyType.LivingSkinnable, "hide"); // BISON
    addItem(326, 6, EnemyType.LivingSkinnable, "hide"); // OWL
    addItem(327, 7, EnemyType.LivingSkinnable, "hide"); // DIREBEAR
    addItem(328, 8, EnemyType.LivingSkinnable, "hide"); // BASILISK*/
/*
    // Mists
    addItem(294, 1, EnemyType.LivingSkinnable, "hide"); // WOLPERTINGER
    addItem(295, 2, EnemyType.LivingSkinnable, "hide"); // FOX
    addItem(296, 3, EnemyType.LivingSkinnable, "hide"); // DEER
    addItem(297, 4, EnemyType.LivingSkinnable, "hide"); // GIANTSTAG
    addItem(298, 5, EnemyType.LivingSkinnable, "hide"); // OWL
    addItem(299, 6, EnemyType.LivingSkinnable, "hide"); // HOUND
    addItem(300, 7, EnemyType.LivingSkinnable, "hide"); // DIREBEAR
    addItem(301, 8, EnemyType.LivingSkinnable, "hide"); // DRAGONHAWK

    // Treasure Mists
    addItem(302, 4, EnemyType.LivingSkinnable, "hide"); // T4_MOB_TREASURE_MISTS_GIANTSTAG
    addItem(303, 5, EnemyType.LivingSkinnable, "hide"); // T5_MOB_TREASURE_MISTS_OWL   
    addItem(304, 6, EnemyType.LivingSkinnable, "hide"); // T6_MOB_TREASURE_MISTS_HOUND
    addItem(305, 7, EnemyType.LivingSkinnable, "hide"); // T7_MOB_TREASURE_MISTS_DIREBEAR
    addItem(306, 8, EnemyType.LivingSkinnable, "hide"); // T8_MOB_TREASURE_MISTS_DRAGONHAWK

    // Cougars
    addItem(457, 4, EnemyType.LivingSkinnable, "hide");
    addItem(458, 5, EnemyType.LivingSkinnable, "hide");
    addItem(459, 6, EnemyType.LivingSkinnable, "hide");
    addItem(460, 7, EnemyType.LivingSkinnable, "hide");
    addItem(461, 8, EnemyType.LivingSkinnable, "hide");
    // Veteran
    addItem(462, 4, EnemyType.LivingSkinnable, "hide");
    addItem(463, 5, EnemyType.LivingSkinnable, "hide");
    addItem(464, 6, EnemyType.LivingSkinnable, "hide");
    addItem(465, 7, EnemyType.LivingSkinnable, "hide");
    addItem(466, 8, EnemyType.LivingSkinnable, "hide");
    // Elite
    addItem(467, 4, EnemyType.LivingSkinnable, "hide");
    addItem(468, 5, EnemyType.LivingSkinnable, "hide");
    addItem(469, 6, EnemyType.LivingSkinnable, "hide");
    addItem(470, 7, EnemyType.LivingSkinnable, "hide");
    addItem(471, 8, EnemyType.LivingSkinnable, "hide");

    //#endregion

    //#region Logs
    // Forest +25
    addItem(447, 3, EnemyType.LivingHarvestable, "Logs");
    addItem(448, 3, EnemyType.LivingHarvestable, "Logs");
    addItem(449, 5, EnemyType.LivingHarvestable, "Logs");
    addItem(450, 5, EnemyType.LivingHarvestable, "Logs");
    addItem(451, 7, EnemyType.LivingHarvestable, "Logs");

    // Roads <=> Tx_MOB_CRITTER_WOOD_ROADS
    addItem(472, 4, EnemyType.LivingHarvestable, "Logs");
    addItem(473, 5, EnemyType.LivingHarvestable, "Logs");
    addItem(474, 6, EnemyType.LivingHarvestable, "Logs");
    addItem(475, 7, EnemyType.LivingHarvestable, "Logs");
    addItem(476, 8, EnemyType.LivingHarvestable, "Logs");
    // Roads Veteran <=> Tx_MOB_CRITTER_WOOD_ROADS_VETERAN
    addItem(477, 4, EnemyType.LivingHarvestable, "Logs");
    addItem(478, 5, EnemyType.LivingHarvestable, "Logs");
    addItem(479, 6, EnemyType.LivingHarvestable, "Logs");
    addItem(480, 7, EnemyType.LivingHarvestable, "Logs");
    addItem(481, 8, EnemyType.LivingHarvestable, "Logs");
    // Roads Elite <=> Tx_MOB_CRITTER_WOOD_ROADS_ELITE
    addItem(482, 4, EnemyType.LivingHarvestable, "Logs");
    addItem(483, 5, EnemyType.LivingHarvestable, "Logs");
    addItem(484, 6, EnemyType.LivingHarvestable, "Logs");
    addItem(485, 7, EnemyType.LivingHarvestable, "Logs");
    addItem(486, 8, EnemyType.LivingHarvestable, "Logs");

    // Mists Green <=> Tx_MOB_CRITTER_WOOD_MISTS_GREEN +25
    addItem(532, 3, EnemyType.LivingHarvestable, "Logs");
    addItem(533, 4, EnemyType.LivingHarvestable, "Logs");
    addItem(534, 5, EnemyType.LivingHarvestable, "Logs");
    addItem(535, 6, EnemyType.LivingHarvestable, "Logs");
    addItem(536, 7, EnemyType.LivingHarvestable, "Logs");
    addItem(537, 8, EnemyType.LivingHarvestable, "Logs");
    // Mists Red <=> Tx_MOB_CRITTER_WOOD_MISTS_RED +25
    addItem(556, 3, EnemyType.LivingHarvestable, "Logs");
    addItem(557, 4, EnemyType.LivingHarvestable, "Logs");
    addItem(558, 5, EnemyType.LivingHarvestable, "Logs");
    addItem(559, 6, EnemyType.LivingHarvestable, "Logs");
    addItem(560, 7, EnemyType.LivingHarvestable, "Logs");
    addItem(561, 8, EnemyType.LivingHarvestable, "Logs");
    // Mists Dead <=> Tx_MOB_CRITTER_WOOD_MISTS_DEAD +25
    addItem(580, 3, EnemyType.LivingHarvestable, "Logs");
    addItem(581, 4, EnemyType.LivingHarvestable, "Logs");
    addItem(582, 5, EnemyType.LivingHarvestable, "Logs");
    addItem(583, 6, EnemyType.LivingHarvestable, "Logs");
    addItem(584, 7, EnemyType.LivingHarvestable, "Logs");
    addItem(585, 8, EnemyType.LivingHarvestable, "Logs");
    //#endregion

    //#region Rock
    // Highland +25
    addItem(452, 3, EnemyType.LivingHarvestable, "rock");
    addItem(453, 3, EnemyType.LivingHarvestable, "rock");
    addItem(454, 5, EnemyType.LivingHarvestable, "rock");
    addItem(455, 5, EnemyType.LivingHarvestable, "rock");
    addItem(456, 7, EnemyType.LivingHarvestable, "rock");

    // Roads <=> Tx_MOB_CRITTER_ROCK_ROADS +25
    addItem(487, 4, EnemyType.LivingHarvestable, "rock");
    addItem(488, 5, EnemyType.LivingHarvestable, "rock");
    addItem(489, 6, EnemyType.LivingHarvestable, "rock");
    addItem(490, 7, EnemyType.LivingHarvestable, "rock");
    addItem(491, 8, EnemyType.LivingHarvestable, "rock");
    // Veteran Roads <=> Tx_MOB_CRITTER_ROCK_ROADS_VETERAN +25
    addItem(492, 4, EnemyType.LivingHarvestable, "rock");
    addItem(493, 5, EnemyType.LivingHarvestable, "rock");
    addItem(494, 6, EnemyType.LivingHarvestable, "rock");
    addItem(495, 7, EnemyType.LivingHarvestable, "rock");
    addItem(496, 8, EnemyType.LivingHarvestable, "rock");
    // Elite Roads <=> Tx_MOB_CRITTER_ROCK_ROADS_ELITE +25
    addItem(497, 4, EnemyType.LivingHarvestable, "rock");
    addItem(498, 5, EnemyType.LivingHarvestable, "rock");
    addItem(499, 6, EnemyType.LivingHarvestable, "rock");
    addItem(500, 7, EnemyType.LivingHarvestable, "rock");
    addItem(501, 8, EnemyType.LivingHarvestable, "rock");

    // Mists Green <=> Tx_MOB_CRITTER_ROCK_MISTS_GREEN +25
    addItem(538, 3, EnemyType.LivingHarvestable, "rock");
    addItem(539, 4, EnemyType.LivingHarvestable, "rock");
    addItem(540, 5, EnemyType.LivingHarvestable, "rock");
    addItem(541, 6, EnemyType.LivingHarvestable, "rock");
    addItem(542, 7, EnemyType.LivingHarvestable, "rock");
    addItem(543, 8, EnemyType.LivingHarvestable, "rock");
    // Mists Red <=> Tx_MOB_CRITTER_ROCK_MISTS_RED +25
    addItem(562, 3, EnemyType.LivingHarvestable, "rock");
    addItem(563, 4, EnemyType.LivingHarvestable, "rock");
    addItem(564, 5, EnemyType.LivingHarvestable, "rock");
    addItem(565, 6, EnemyType.LivingHarvestable, "rock");
    addItem(566, 7, EnemyType.LivingHarvestable, "rock");
    addItem(567, 8, EnemyType.LivingHarvestable, "rock");
    // Mists Dead <=> Tx_MOB_CRITTER_ROCK_MISTS_DEAD +25
    addItem(586, 3, EnemyType.LivingHarvestable, "rock");
    addItem(587, 4, EnemyType.LivingHarvestable, "rock");
    addItem(588, 5, EnemyType.LivingHarvestable, "rock");
    addItem(589, 6, EnemyType.LivingHarvestable, "rock");
    addItem(590, 7, EnemyType.LivingHarvestable, "rock");
    addItem(591, 8, EnemyType.LivingHarvestable, "rock");
    //#endregion

    //#region Ore
    // Mountain +25
    addItem(442, 3, EnemyType.LivingHarvestable, "ore");
    addItem(443, 3, EnemyType.LivingHarvestable, "ore");
    addItem(444, 5, EnemyType.LivingHarvestable, "ore");
    addItem(445, 5, EnemyType.LivingHarvestable, "ore");
    addItem(446, 7, EnemyType.LivingHarvestable, "ore");

    // Roads <=> Tx_MOB_CRITTER_ORE_ROADS +25
    addItem(502, 4, EnemyType.LivingHarvestable, "ore");
    addItem(503, 5, EnemyType.LivingHarvestable, "ore");
    addItem(504, 6, EnemyType.LivingHarvestable, "ore");
    addItem(505, 7, EnemyType.LivingHarvestable, "ore");
    addItem(506, 8, EnemyType.LivingHarvestable, "ore");
    // Veteran Roads <=> Tx_MOB_CRITTER_ORE_ROADS_VETERAN +25
    addItem(507, 4, EnemyType.LivingHarvestable, "ore");
    addItem(508, 5, EnemyType.LivingHarvestable, "ore");
    addItem(509, 6, EnemyType.LivingHarvestable, "ore");
    addItem(510, 7, EnemyType.LivingHarvestable, "ore");
    addItem(511, 8, EnemyType.LivingHarvestable, "ore");
    // Elite Roads <=> Tx_MOB_CRITTER_ORE_ROADS_ELITE +25
    addItem(512, 4, EnemyType.LivingHarvestable, "ore");
    addItem(513, 5, EnemyType.LivingHarvestable, "ore");
    addItem(514, 6, EnemyType.LivingHarvestable, "ore");
    addItem(515, 7, EnemyType.LivingHarvestable, "ore");
    addItem(516, 8, EnemyType.LivingHarvestable, "ore");

    // Mists Green <=> Tx_MOB_CRITTER_ORE_MISTS_GREEN +25
    addItem(544, 3, EnemyType.LivingHarvestable, "ore");
    addItem(545, 4, EnemyType.LivingHarvestable, "ore");
    addItem(546, 5, EnemyType.LivingHarvestable, "ore");
    addItem(547, 6, EnemyType.LivingHarvestable, "ore");
    addItem(548, 7, EnemyType.LivingHarvestable, "ore");
    addItem(549, 8, EnemyType.LivingHarvestable, "ore");
    // Mists Red <=> Tx_MOB_CRITTER_ORE_MISTS_RED +25
    addItem(568, 3, EnemyType.LivingHarvestable, "ore");
    addItem(569, 4, EnemyType.LivingHarvestable, "ore");
    addItem(570, 5, EnemyType.LivingHarvestable, "ore");
    addItem(571, 6, EnemyType.LivingHarvestable, "ore");
    addItem(572, 7, EnemyType.LivingHarvestable, "ore");
    addItem(573, 8, EnemyType.LivingHarvestable, "ore");
    // Mists Dead <=> Tx_MOB_CRITTER_ORE_MISTS_DEAD +25
    addItem(592, 3, EnemyType.LivingHarvestable, "ore");
    addItem(593, 4, EnemyType.LivingHarvestable, "ore");
    addItem(594, 5, EnemyType.LivingHarvestable, "ore");
    addItem(595, 6, EnemyType.LivingHarvestable, "ore");
    addItem(596, 7, EnemyType.LivingHarvestable, "ore");
    addItem(597, 8, EnemyType.LivingHarvestable, "ore");
    //#endregion

    //#region Fiber
    // ??? <=> Don't know the location <=> Tx_MOB_CRITTER_FIBER + 25
    addItem(436, 3, EnemyType.LivingHarvestable, "fiber");
    addItem(437, 5, EnemyType.LivingHarvestable, "fiber");
    addItem(438, 7, EnemyType.LivingHarvestable, "fiber");

    // Roads <=> Tx_MOB_CRITTER_FIBER_ROADS +25
    addItem(517, 4, EnemyType.LivingHarvestable, "fiber");
    addItem(518, 5, EnemyType.LivingHarvestable, "fiber");
    addItem(519, 6, EnemyType.LivingHarvestable, "fiber"); // 509 // -17
    addItem(520, 7, EnemyType.LivingHarvestable, "fiber"); // 510 // -17
    addItem(521, 8, EnemyType.LivingHarvestable, "fiber");
    // Veteran Roads <=> Tx_MOB_CRITTER_FIBER_ROADS_VETERAN +25
    addItem(522, 4, EnemyType.LivingHarvestable, "fiber");
    addItem(523, 5, EnemyType.LivingHarvestable, "fiber");
    addItem(524, 6, EnemyType.LivingHarvestable, "fiber");
    addItem(525, 7, EnemyType.LivingHarvestable, "fiber");
    addItem(526, 8, EnemyType.LivingHarvestable, "fiber");
    // Elite Roads <=> Tw_MOB_CRITTER_FIBER_ROADS_ELITE +25
    addItem(527, 4, EnemyType.LivingHarvestable, "fiber");
    addItem(528, 5, EnemyType.LivingHarvestable, "fiber");
    addItem(529, 6, EnemyType.LivingHarvestable, "fiber");
    addItem(530, 7, EnemyType.LivingHarvestable, "fiber");
    addItem(531, 8, EnemyType.LivingHarvestable, "fiber");

    // Mists Green <=> Tx_MOB_CRITTER_FIBER_MISTS_GREEN +25
    addItem(550, 3, EnemyType.LivingHarvestable, "fiber");
    addItem(551, 4, EnemyType.LivingHarvestable, "fiber");
    addItem(552, 5, EnemyType.LivingHarvestable, "fiber");
    addItem(553, 6, EnemyType.LivingHarvestable, "fiber");
    addItem(554, 7, EnemyType.LivingHarvestable, "fiber");
    addItem(555, 8, EnemyType.LivingHarvestable, "fiber");
    // Mists Red <=> Tx_MOB_CRITTER_FIBER_MISTS_RED +25
    addItem(574, 3, EnemyType.LivingHarvestable, "fiber");
    addItem(575, 4, EnemyType.LivingHarvestable, "fiber");
    addItem(576, 5, EnemyType.LivingHarvestable, "fiber");
    addItem(577, 6, EnemyType.LivingHarvestable, "fiber");
    addItem(578, 7, EnemyType.LivingHarvestable, "fiber");
    addItem(579, 8, EnemyType.LivingHarvestable, "fiber");
    // Mists Dead <=> Tx_MOB_CRITTER_FIBER_MISTS_DEAD +25
    addItem(598, 3, EnemyType.LivingHarvestable, "fiber");
    addItem(599, 4, EnemyType.LivingHarvestable, "fiber");
    addItem(600, 5, EnemyType.LivingHarvestable, "fiber");
    addItem(601, 6, EnemyType.LivingHarvestable, "fiber");
    addItem(602, 7, EnemyType.LivingHarvestable, "fiber");
    addItem(603, 8, EnemyType.LivingHarvestable, "fiber");
    //#endregion
    
    //#region Mist bosses
    
    // CRYSTALSPIDER <=> Tx_MOB_ARCANE_CRYSTALSPIDER_BOSS
    addItem(271, 5, EnemyType.MistBoss, "CRYSTALSPIDER");
    addItem(272, 6, EnemyType.MistBoss, "CRYSTALSPIDER");
    addItem(273, 7, EnemyType.MistBoss, "CRYSTALSPIDER");
    addItem(274, 8, EnemyType.MistBoss, "CRYSTALSPIDER");
    // CRYSTALSPIDER VETERAN <=> Tx_MOB_ARCANE_CRYSTALSPIDER_VETERAN_BOSS 
    addItem(275, 4, EnemyType.MistBoss, "CRYSTALSPIDER");
    addItem(276, 5, EnemyType.MistBoss, "CRYSTALSPIDER");
    addItem(277, 6, EnemyType.MistBoss, "CRYSTALSPIDER");
    addItem(278, 7, EnemyType.MistBoss, "CRYSTALSPIDER");
    addItem(279, 8, EnemyType.MistBoss, "CRYSTALSPIDER");
    
    // Spider : VEILWEAVER <=> Tx_MOB_MISTS_SPIDER +25
    addItem(307, 4, EnemyType.MistBoss, "VEILWEAVER");
    addItem(308, 5, EnemyType.MistBoss, "VEILWEAVER");
    addItem(309, 6, EnemyType.MistBoss, "VEILWEAVER");
    addItem(310, 7, EnemyType.MistBoss, "VEILWEAVER");
    addItem(311, 8, EnemyType.MistBoss, "VEILWEAVER");

    // FAIRYDRAGON <=> Tx_MOB_MISTS_FAIRYDRAGON +25
    addItem(312, 4, EnemyType.MistBoss, "FAIRYDRAGON");
    addItem(313, 5, EnemyType.MistBoss, "FAIRYDRAGON");
    addItem(314, 6, EnemyType.MistBoss, "FAIRYDRAGON");
    addItem(315, 7, EnemyType.MistBoss, "FAIRYDRAGON");
    addItem(316, 8, EnemyType.MistBoss, "FAIRYDRAGON");

    // GRIFFIN <=> Tx_MOB_MISTS_GRIFFIN +25
    addItem(317, 4, EnemyType.MistBoss, "GRIFFIN");
    addItem(318, 5, EnemyType.MistBoss, "GRIFFIN");
    addItem(319, 6, EnemyType.MistBoss, "GRIFFIN");
    addItem(320, 7, EnemyType.MistBoss, "GRIFFIN");
    addItem(321, 8, EnemyType.MistBoss, "GRIFFIN");
    //#endregion
    
    
    //#region Avalon Drones Treasure
    // Standard
    addItem(794, 5, EnemyType.Drone, "");
    addItem(795, 6, EnemyType.Drone, "");
    addItem(796, 7, EnemyType.Drone, "");
    addItem(797, 8, EnemyType.Drone, "");
    // Uncomon
    addItem(798, 5, EnemyType.Drone, "");
    addItem(799, 6, EnemyType.Drone, "");
    addItem(800, 7, EnemyType.Drone, "");
    addItem(801, 8, EnemyType.Drone, "");
    // Rare
    addItem(802, 5, EnemyType.Drone, "");
    addItem(803, 6, EnemyType.Drone, "");
    addItem(804, 7, EnemyType.Drone, "");
    addItem(805, 8, EnemyType.Drone, "");
    // Legendary
    addItem(806, 5, EnemyType.Drone, "");
    addItem(807, 6, EnemyType.Drone, "");
    addItem(808, 7, EnemyType.Drone, "");
    addItem(809, 8, EnemyType.Drone, "");
    //#endregion
    
    //#region Event Enemies
    //#region EASTER
    // Chests
    addItem(716, 2, EnemyType.Events, "EVENTEASTERCHEST2");
    addItem(717, 3, EnemyType.Events, "EVENTEASTERCHEST2");
    addItem(718, 4, EnemyType.Events, "EVENTEASTERCHEST2");
    addItem(719, 5, EnemyType.Events, "EVENTEASTERCHEST2");
    addItem(720, 6, EnemyType.Events, "EVENTEASTERCHEST2");
    addItem(721, 7, EnemyType.Events, "EVENTEASTERCHEST2");
    addItem(722, 8, EnemyType.Events, "EVENTEASTERCHEST2");

    // Enemies
    addItem(733, 2, EnemyType.Events, "EVENTEASTERCHEST1");
    addItem(734, 3, EnemyType.Events, "EVENTEASTERCHEST1");
    addItem(735, 4, EnemyType.Events, "EVENTEASTERCHEST1");
    addItem(736, 5, EnemyType.Events, "EVENTEASTERCHEST1");
    addItem(737, 6, EnemyType.Events, "EVENTEASTERCHEST1");
    //#endregion

    //#endregion
    */

    return mobList;
}