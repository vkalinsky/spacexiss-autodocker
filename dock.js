function sr(n,rr,l,m){
    var d = camera.rotation[n]
    if(Math.abs(d)<0.002)
        return

    tr = d/5
    r = rr()/10*toRAD
    if(r > tr)
        l()
    else
        m()
}

function sp(n,l,m) {
    var d = issObject.position[n] - camera.position[n]
    if(Math.abs(d) < 0.07)
        return

    tr = d * 0.01
    cr = motionVector[n]

    if(cr > tr) {
        l()
    } else {
        m()
    }
}

function setZ() {
    if(Math.abs(issObject.position.x - camera.position.x) > 0.2
        || Math.abs(issObject.position.y - camera.position.y > 0.2) ) {
            return
        }

    var d = issObject.position.z - camera.position.z
    var tr = Math.min(0.002 + d*d/20000, 0.1)
    var cr = -motionVector.z

    if(cr < tr) {
        translateForward()
    } else {
        translateBackward()
    }
}

function zeroIn() {
    sr('y', ()=>rateRotationY,yawLeft,yawRight)
    sr('x',()=>rateRotationX,pitchUp,pitchDown)
    sr('z',()=>rateRotationZ,rollLeft,rollRight)
    sp('y', translateDown, translateUp)
    sp('x', translateLeft, translateRight)
    setZ();
}


window.clearInterval(iii)
var iii = window.setInterval(zeroIn, 200)
