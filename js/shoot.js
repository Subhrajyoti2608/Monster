AFRAME.registerComponent("bullets",{
    init: function(){
        this.shootBullets()
    },
    shootBullets: function(){
        window.addEventListener("keydown",(e)=>{
            if(e.key === "z"){
                var bullet = document.createElement("a-entity")

                bullet.setAttribute("geometry",{primitive:"sphere",radius:0.1})

                bullet.setAttribute("material","color","black")

                var camera = document.querySelector("#camera").object3D

                var direction=new THREE.Vector3()
                camera.getWorldPosition(direction)

                var scene = document.querySelector("#scene")

                bullet.setAttribute("velocity",direction.multiplyScalar(-50))

                bullet.setAttribute("dynamic-body",{mass:"50",shape:"sphere"})

                bullet.addEventListener("collide",this.removeBullet)

                scene.appendChild(bullet)
            }
        })
    },
    removeBullet: function(){
        var scene = document.querySelector("#scene")

        var element = e.detail.target.el

        var elementHit = e.detail.body.el 
        
        
    }
})