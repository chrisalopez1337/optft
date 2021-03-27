# General notes
For account recovery I should use localStorage to persist the step they are on incase they were to refresh the page. (pre-password entry atleast)


# Notes for the data processing script


# Eventually I want the ability for when you click on a single game, it fetches all the other playes in the lobbys averages over 20 games and then we could not only store that for faster load times potentially, but also to give more accurate averages.

# What I want it to do
- Provide overall stats and differentials for those stats
- Hopefully have some kind of algorithim to provide "Tips" a player
- Hopefully have a property with all of the match data to preview, and then to go into a single match's data.

# How I am going to tackle this
- First I am going to mainly concern myself with one thing at a time with seperate functions, firstly it will be collecting overall data, and then displaying that on the frontend.

### Data we have access too, per player, per match
- gold_left : Are we spending our gold 
- last_round : Are you dying to early
- level: Are you leveling up to much / not leveling up enough
- placement: W/L ratio
- time_eliminated: like above, are you dying to early
- total_damage_to_players: can be another metric if your teams are weaker or you play to passive
- traits: Collect data for the traits with the highest winrate (Maybe think of adding a module to display all trait data)
- units: Porbably not going to concern ourselves with this currently, but would calculate winrate overall
