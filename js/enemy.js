AFRAME.registerComponent("enemy-bullets",{
    init:function(){
       setInterval(this.enemyShootBullet, 2000) 
    },
    enemyShootBullet: function(){
        var ele = document.querySelectorAll(".enemy")

 
        for ( var i=0; i < ele.length; i++){

            var enemyBullet = document.createElement("a-entity");

            enemyBullet.setAttribute("geometry", {
                primitive: "sphere",
                radius: 0.1,
            });

            enemyBullet.setAttribute("material", "color", "red");

            var pos = ele[i].getAttribute("position")

            enemyBullet.setAttribute("position", {
                x: position.x + 1.5,
                y: position.y + 3.5,
                z: position.z,
            });

            var scene = document.querySelector("#scene");
            scene.appendChild(enemyBullet);

            var enemy = ele[i].object3D

            var player = document.querySelector("#weapon").object3D

            var position1 = new THREE.Vector3()
            var position2 = new THREE.Vector3()

            player.getWorldPosition(position1)
            enemy.getWorldPosition(position2)

            var direction= new THREE.Vector3()
            direction.subVectors(position1,position2).normalize()

            enemyBullet.setAttribute("velocity",direction.multiplyScalar(10))

            enemyBullet.setAttribute("dynamic-body", {
                shape: "sphere",
                mass: "0",
            });

            var element = document.querySelector("#countLife2")

            var playerLife = parseInt(element.getAttribute("text").value)

            enemyBullet.addEventListener("collide",function(e){
                if(e.detail.body.el === "weapon"){

                    if(playerLife > 0){
                        playerLife-=1
                        element.setAttribute("text",{
                            value: playerLife
                        })
                    }

                    if(playerLife <= 0){
                        var txt = document.querySelector("#over")
                        txt.setAttribute("visible",true)  
                        
                        var monsterEl = document.querySelectorAll(".enemy")

                        for (var i = 0; i < monsterEl.length; i++){
                            scene.removeChild(monsterEl[i])
                        }
                    }
                }
            })

            
        }
    }
})