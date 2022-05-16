# Maze Runner
First game project using HTML, CSS, JavaScript and Canvas.

## Project Brief
***Technologies & tools used***
- HTML
- CSS
- JavaScript
- Canvas
- GitHub

## Timeframe
1 week

<br>

## Description
Maze runner is a game where the player controls a character on a game board with a labyrinth structure. The player must avoid colliding with enemies and obtain a key in order to exit the dungeon. If the player picks up the sword, he can kill enemies for a set amount of time.
The game ends when either the player succeeds in exiting the dungeon or he is killed by snakemen.

I wanted to create a dungeon roguelike game as I was always mesmerized by the lore and randomness of how roguelike games function, such as 
Binding of Isaac. One wrong step/move and it could mean death for the player.

I found a lot of joy in creating this game and hope that you enjoy it too.

<br>

## Deployment
This game is deployed on GitHub and Vercel and you can play it here: https://mazerunner.vercel.app/

<br>

## How to play
By either using WASD keys or arrow keys, navigate the character to pick up the dungeon exit key. Picking up swords enables the player to be invulnerable and able to kill the enemies on the game board.

<br>


## Approach and Process


***What in my process and approach to this project would I do differently next time?*** <br>
I would have started earlier on this project had I known how daunting it would be to create games using JavaScript. Overall, I could have implemented a Gantt Chart to track my progress in order to hold myself accountable. <br>
I have also bought myself a whiteboard to track my daily ToDo's and I look forward to seeing how it affects my productivity overall in the near future.

***What in my process and approach to this project went well that I would repeat next time?*** <br>
I think that, considering the tight timeframe and existing skill-level, the project turned out at a satisfactory level to me. I took frequent breaks between problems and managed to keep my brain from exploding so that was cool.

## Code and Code Design

***Wireframe*** <br>
Before creating the game, I knew I had to generate tiles for the game map. I did this through HTML Canvas Graphics which enabled me to generate tiles based on an array of arrays.
The player, enemies, floor, walls, sword, key and exit are all different types of tiles. <br>
 - floor tiles can be walked on by player tiles and enemy tiles
 - wall tiles cannot be walked through by player tiles and enemy tiles
 - player tile is vulnerable to enemy tiles
 - enemy tiles move randomly around the map
 - sword tiles enable player tile to become player with sword tile, which is invulnerable to enemy tiles and enemy tiles become vulnerable to player with sword tile.

![wireframe](https://user-images.githubusercontent.com/98401776/168568961-536cc36e-f995-4fb8-adfa-37854e56d6c3.jpg)

***What in my code and program design in the project would I do differently next time?*** <br>
I would definitely have added more comments whilst writing my code, as this would enable me to see in a clearer light exactly what each line does instead of having to re-visit the code after a few hours and taking time to comprehend what I was doing at that certain point.
I would have definitely refactored my code to be more concise as, to be honest, it does look confusing from a third-person perspective.
<br> for example, if I didn't know what I was trying to achieve with this, the maintainer of this code will have a hard time trying to decrypt.
![takeSword](https://user-images.githubusercontent.com/98401776/168574551-d61e498a-8700-4039-b90f-a26825c3461d.PNG)

<br> after writing comments, it does look more neat in a certain manner.
![takeSword2](https://user-images.githubusercontent.com/98401776/168574595-8baa6aee-6d19-44f4-9744-8f954cb930aa.PNG)


***What in my code and program design in the project went well? Is there anything I would do the same next time?***
After being stubborn for a period of time, I turned to Google, StackOverflow and Youtube for advice on how to proceed in certain areas such as Map Generation and Collision Detection using Canvas. I found that asking for help is definitely more efficient and a better use of time
than staring at code for long periods hoping for a light bulb to light up in my head. In the future, I will definitely be less hesitant to ask for help and search for solutions that others have had experience with.


## SEI Post Mortem

***What habits did I use during this unit that helped me?***
- Stubborness - can't stop won't stop searching for solutions
- Resourcefulness - Google is your ally, the real G in FAANG

<br>

***What habits did I have during this unit that I can improve on?***
- Stubborness - feel guilty taking breaks
- Comments need to be written, I ask to be forgiven

## References
I take no credit for all images and music used in this production.



