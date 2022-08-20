
window.addEventListener('DOMContentLoaded', (event) => {


    const squaretable = {} // this section of code is an optimization for use of the hypotenuse function on Line and LineOP objects
    for (let t = 0; t < 10000000; t++) {
        squaretable[`${t}`] = Math.sqrt(t)
        if (t > 999) {
            t += 9
        }
    }
    let canvas
    let canvas_context
    let keysPressed = {}
    let FLEX_engine
    let TIP_engine = {}
    let XS_engine
    let YS_engine
    TIP_engine.x = 350
    TIP_engine.y = 350

    class Line {
        constructor(x, y, x2, y2, color, width) {
            this.x1 = x
            this.y1 = y
            this.x2 = x2
            this.y2 = y2
            this.color = color
            this.width = width
        }
        angle() {
            return Math.atan2(this.y1 - this.y2, this.x1 - this.x2)
        }
        squareDistance() {
            let xdif = this.x1 - this.x2
            let ydif = this.y1 - this.y2
            let squareDistance = (xdif * xdif) + (ydif * ydif)
            return squareDistance
        }
        hypotenuse() {
            let xdif = this.x1 - this.x2
            let ydif = this.y1 - this.y2
            let hypotenuse = (xdif * xdif) + (ydif * ydif)
            if (hypotenuse < 10000000 - 1) {
                if (hypotenuse > 1000) {
                    return squaretable[`${Math.round(10 * Math.round((hypotenuse * .1)))}`]
                } else {
                    return squaretable[`${Math.round(hypotenuse)}`]
                }
            } else {
                return Math.sqrt(hypotenuse)
            }
        }
        draw() {
            let linewidthstorage = canvas_context.lineWidth
            canvas_context.strokeStyle = this.color
            canvas_context.lineWidth = this.width
            canvas_context.beginPath()
            canvas_context.moveTo(this.x1, this.y1)
            canvas_context.lineTo(this.x2, this.y2)
            canvas_context.stroke()
            canvas_context.lineWidth = linewidthstorage
        }
    }
    class LineOP {
        constructor(object, target, color, width) {
            this.object = object
            this.target = target
            this.color = color
            this.width = width
        }
        squareDistance() {
            let xdif = this.object.x - this.target.x
            let ydif = this.object.y - this.target.y
            let squareDistance = (xdif * xdif) + (ydif * ydif)
            return squareDistance
        }
        hypotenuse() {
            let xdif = this.object.x - this.target.x
            let ydif = this.object.y - this.target.y
            let hypotenuse = (xdif * xdif) + (ydif * ydif)
            if (hypotenuse < 10000000 - 1) {
                if (hypotenuse > 1000) {
                    return squaretable[`${Math.round(10 * Math.round((hypotenuse * .1)))}`]
                } else {
                    return squaretable[`${Math.round(hypotenuse)}`]
                }
            } else {
                return Math.sqrt(hypotenuse)
            }
        }
        angle() {
            return Math.atan2(this.object.y - this.target.y, this.object.x - this.target.x)
        }
        draw() {
            let linewidthstorage = canvas_context.lineWidth
            canvas_context.strokeStyle = this.color
            canvas_context.lineWidth = this.width
            canvas_context.beginPath()
            canvas_context.moveTo(this.object.x, this.object.y)
            canvas_context.lineTo(this.target.x, this.target.y)
            canvas_context.stroke()
            canvas_context.lineWidth = linewidthstorage
        }
    }
    class Circle {
        constructor(x, y, radius, color, xmom = 0, ymom = 0, friction = 1, reflect = 0, strokeWidth = 0, strokeColor = "transparent") {
            this.x = x
            this.y = y
            this.radius = radius
            this.color = color
            this.xmom = xmom
            this.ymom = ymom
            this.friction = friction
            this.reflect = reflect
            this.strokeWidth = strokeWidth
            this.strokeColor = strokeColor
        }
        draw() {
            canvas_context.lineWidth = this.strokeWidth
            canvas_context.strokeStyle = this.color
            canvas_context.beginPath();
            if (this.radius > 0) {
                canvas_context.arc(this.x, this.y, this.radius, 0, (Math.PI * 2), true)
                canvas_context.fillStyle = this.color
                canvas_context.fill()
                canvas_context.stroke();
            } else {
                //console.log("The circle is below a radius of 0, and has not been drawn. The circle is:", this)
            }
        }
        move() {
            if (this.reflect == 1) {
                if (this.x + this.radius > canvas.width) {
                    if (this.xmom > 0) {
                        this.xmom *= -1
                    }
                }
                if (this.y + this.radius > canvas.height) {
                    if (this.ymom > 0) {
                        this.ymom *= -1
                    }
                }
                if (this.x - this.radius < 0) {
                    if (this.xmom < 0) {
                        this.xmom *= -1
                    }
                }
                if (this.y - this.radius < 0) {
                    if (this.ymom < 0) {
                        this.ymom *= -1
                    }
                }
            }
            this.x += this.xmom
            this.y += this.ymom
        }
        unmove() {
            if (this.reflect == 1) {
                if (this.x + this.radius > canvas.width) {
                    if (this.xmom > 0) {
                        this.xmom *= -1
                    }
                }
                if (this.y + this.radius > canvas.height) {
                    if (this.ymom > 0) {
                        this.ymom *= -1
                    }
                }
                if (this.x - this.radius < 0) {
                    if (this.xmom < 0) {
                        this.xmom *= -1
                    }
                }
                if (this.y - this.radius < 0) {
                    if (this.ymom < 0) {
                        this.ymom *= -1
                    }
                }
            }
            this.x -= this.xmom
            this.y -= this.ymom
        }
        frictiveMove() {
            if (this.reflect == 1) {
                if (this.x + this.radius > canvas.width) {
                    if (this.xmom > 0) {
                        this.xmom *= -1
                    }
                }
                if (this.y + this.radius > canvas.height) {
                    if (this.ymom > 0) {
                        this.ymom *= -1
                    }
                }
                if (this.x - this.radius < 0) {
                    if (this.xmom < 0) {
                        this.xmom *= -1
                    }
                }
                if (this.y - this.radius < 0) {
                    if (this.ymom < 0) {
                        this.ymom *= -1
                    }
                }
            }
            this.x += this.xmom
            this.y += this.ymom
            this.xmom *= this.friction
            this.ymom *= this.friction
        }
        frictiveunMove() {
            if (this.reflect == 1) {
                if (this.x + this.radius > canvas.width) {
                    if (this.xmom > 0) {
                        this.xmom *= -1
                    }
                }
                if (this.y + this.radius > canvas.height) {
                    if (this.ymom > 0) {
                        this.ymom *= -1
                    }
                }
                if (this.x - this.radius < 0) {
                    if (this.xmom < 0) {
                        this.xmom *= -1
                    }
                }
                if (this.y - this.radius < 0) {
                    if (this.ymom < 0) {
                        this.ymom *= -1
                    }
                }
            }
            this.xmom /= this.friction
            this.ymom /= this.friction
            this.x -= this.xmom
            this.y -= this.ymom
        }
        isPointInside(point) {
            this.areaY = point.y - this.y
            this.areaX = point.x - this.x
            if (((this.areaX * this.areaX) + (this.areaY * this.areaY)) <= (this.radius * this.radius)) {
                return true
            }
            return false
        }
        doesPerimeterTouch(point) {
            this.areaY = point.y - this.y
            this.areaX = point.x - this.x
            if (((this.areaX * this.areaX) + (this.areaY * this.areaY)) <= ((this.radius + point.radius) * (this.radius + point.radius))) {
                return true
            }
            return false
        }
    }
    class Shape {
        constructor(shapes) {
            this.shapes = shapes
        }
        draw() {
            for (let t = 0; t < this.shapes.length; t++) {
                this.shapes[t].draw()
            }
        }
        isPointInside(point) {
            for (let t = 0; t < this.shapes.length; t++) {
                if (this.shapes[t].isPointInside(point)) {
                    return true
                }
            }
            return false
        }
        doesPerimeterTouch(point) {
            for (let t = 0; t < this.shapes.length; t++) {
                if (this.shapes[t].doesPerimeterTouch(point)) {
                    return true
                }
            }
            return false
        }
        innerShape(point) {
            for (let t = 0; t < this.shapes.length; t++) {
                if (this.shapes[t].doesPerimeterTouch(point)) {
                    return this.shapes[t]
                }
            }
            return false
        }
        isInsideOf(box) {
            for (let t = 0; t < this.shapes.length; t++) {
                if (box.isPointInside(this.shapes[t])) {
                    return true
                }
            }
            return false
        }
        adjustByFromDisplacement(x, y) {
            for (let t = 0; t < this.shapes.length; t++) {
                if (typeof this.shapes[t].fromRatio == "number") {
                    this.shapes[t].x += x * this.shapes[t].fromRatio
                    this.shapes[t].y += y * this.shapes[t].fromRatio
                }
            }
        }
        adjustByToDisplacement(x, y) {
            for (let t = 0; t < this.shapes.length; t++) {
                if (typeof this.shapes[t].toRatio == "number") {
                    this.shapes[t].x += x * this.shapes[t].toRatio
                    this.shapes[t].y += y * this.shapes[t].toRatio
                }
            }
        }
        mixIn(arr) {
            for (let t = 0; t < arr.length; t++) {
                for (let k = 0; k < arr[t].shapes.length; k++) {
                    this.shapes.push(arr[t].shapes[k])
                }
            }
        }
        push(object) {
            this.shapes.push(object)
        }
    }

    function setUp(canvas_pass, style = "#0000ff") {
        canvas = canvas_pass
        canvas_context = canvas.getContext('2d');
        canvas.style.background = style
        window.setInterval(function () {
            main()
        },1)
        document.addEventListener('keydown', (event) => {
            keysPressed[event.key] = true;
        });
        document.addEventListener('keyup', (event) => {
            delete keysPressed[event.key];
        });
        window.addEventListener('pointerdown', e => {
            FLEX_engine = canvas.getBoundingClientRect();
            XS_engine = e.clientX - FLEX_engine.left;
            YS_engine = e.clientY - FLEX_engine.top;
            TIP_engine.x = XS_engine
            TIP_engine.y = YS_engine
            TIP_engine.body = TIP_engine
            car.x = TIP_engine.x
            car.y = TIP_engine.y
            // example usage: if(object.isPointInside(TIP_engine)){ take action }
        });
        window.addEventListener('pointermove', continued_stimuli);

        window.addEventListener('pointerup', e => {
            // window.removeEventListener("pointermove", continued_stimuli);
        })
        function continued_stimuli(e) {
            FLEX_engine = canvas.getBoundingClientRect();
            XS_engine = e.clientX - FLEX_engine.left;
            YS_engine = e.clientY - FLEX_engine.top;
            TIP_engine.x = XS_engine
            TIP_engine.y = YS_engine
            TIP_engine.body = TIP_engine
        }
    }
    function getRandomColor() { // random color
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[(Math.floor(Math.random() * 16) + 0)];
        }
        return color;
    }
    let setup_canvas = document.getElementById('canvas') //getting canvas from document
    let output_canvas = document.getElementById('output') //getting canvas from document

    output_canvas_context = output_canvas.getContext('2d');
    output_canvas.style.background = "#000000"

    setUp(setup_canvas) // setting up canvas refrences, starting timer. 

    // object instantiation and creation happens here 

    class Weight {
        constructor(from, to) {
            this.value = this.weight()
            this.from = from
            this.to = to
            this.change = 0
            this.delta = 1
        }
        valueOf() {
            return this.value
        }
        weight() {
            return (Math.random()-.5)
        }
        setChange(num) {
            this.change = num
        }
        setWeight(num) {
            this.value = num
        }
    }
    class Perceptron {
        constructor(inputs) {
            this.bias = (Math.random() - .5) 
            this.value = this.bias
            this.weights = []
            this.outputConnections = []
            this.inputs = inputs
            this.error = 0
            this.delta = 1
            for (let t = 0; t < this.inputs.length; t++) {
                this.weights.push(this.weight(this.inputs[t]))
            }
            this.z = -1
            this.change = 0
        }
        setError(error) {
            this.error = error
        }
        setDelta(delta) {
            this.delta = delta
            for(let t = 0;t<this.outputConnections.length;t++){
                this.outputConnections[t].delta = this.delta
            }
        }
        setBias(bias) {
            this.bias = bias
        }
        setChange(num) {
            this.change = num
        }
        weight(link) {
            let weight = new Weight(link, this)
            if (typeof link != "number") {
                link.outputConnections.push(weight)
            }
            return weight
        }
        valueOf() {
            return this.value
        }
        compute(inputs = this.inputs) {
            this.inputs = inputs
            this.value = this.bias
            for (let t = 0; t < inputs.length; t++) {
                if (t > this.weights.length - 1) {
                    this.weights.push(this.weight())
                    this.value += (inputs[t].valueOf() * this.weights[t].valueOf())
                } else {
                    this.value += (inputs[t].valueOf() * this.weights[t].valueOf())
                }
            }
            this.relu()
            return this.value
        }
        relu() {
            this.value = Math.min(Math.max(this.value, 0.01), .99)
        }
    }
    class Network {
        constructor(inputs, layerSetupArray) {
            this.momentum =.005
            this.learningRate = .005
            this.setup = layerSetupArray
            this.inputs = inputs
            this.structure = []
            this.outputs = []
            for (let t = 0; t < layerSetupArray.length; t++) {
                let scaffold = []
                for (let k = 0; k < layerSetupArray[t]; k++) {
                    let cept
                    if (t == 0) {
                        cept = new Perceptron(this.inputs)
                    } else {
                        cept = new Perceptron(this.structure[t - 1])
                    }
                    scaffold.push(cept)
                }
                this.structure.push(scaffold)
            }
            this.lastinputs = [...this.inputs]
            this.lastgoals = [...this.lastinputs]
            this.swap = []
        }

        becomeNetworkFrom(network) { //using a js file with one variable can be good for this
            // console.log(this.structure[0][0].bias)
            for (let t = 0; t < this.structure.length; t++) {
                // console.log("h1")
                for (let k = 0; k < this.structure[t].length; k++) {
                    // console.log("h2")
                    this.structure[t][k].bias = network.structure[t][k].bias
                    for (let w = 0; w < this.structure[t][k].weights.length; w++) {
                        // console.log("h3")
                        this.structure[t][k].weights[w].setWeight(network.structure[t][k][w].valueOf())
                    }
                }
            }
            // console.log(this.structure[0][0].bias)
        }
        log() {
            let json = {}
            json.structure = []
            json.setup = [...this.setup]
            for (let t = 0; t < this.structure.length; t++) {
                json.structure.push({})
                for (let k = 0; k < this.structure[t].length; k++) {
                    json.structure[t][k] = {}
                    json.structure[t][k].bias = this.structure[t][k].bias.valueOf()
                    for (let w = 0; w < this.structure[t][k].weights.length; w++) {
                        json.structure[t][k][w] = (this.structure[t][k].weights[w].valueOf())
                    }
                }
            }
            console.log(json)
        }
        calculateDeltasSigmoid(goals) {
            for (let t = this.structure.length - 1; t >= 0; t--) {
                const layer = this.structure[t]
                for (let k = 0; k < layer.length; k++) {
                    const perceptron = layer[k]
                    let output = perceptron.valueOf() 
                    let error = 0
                    if (t === this.structure.length - 1) {
                        error = goals[k] - output;
                    } else {
                        for (let k = 0; k < perceptron.outputConnections.length; k++) {
                            const currentConnection = perceptron.outputConnections[k]
                            //console.log(currentConnection)
                            error += currentConnection.to.delta * currentConnection.valueOf()
                        }
                    }
                    perceptron.setError(error)
                    perceptron.setDelta(error * output * (1 - output))
                }
            }
        }
        adjustWeights() {
            for (let t = 0; t < this.structure.length; t++) {
                const layer = this.structure[t]
                for (let k = 0; k < layer.length; k++) {
                    const perceptron = layer[k]
                    let delta = perceptron.delta
                    for (let i = 0; i < perceptron.weights.length; i++) {
                        const connection = perceptron.weights[i]
                        let change = connection.change
                        change = (this.learningRate * delta * perceptron.inputs[i].valueOf()) + (this.momentum * change);
                        connection.setChange(change)
                        connection.setWeight(connection.valueOf() + change)
                    }
                    perceptron.setBias(perceptron.bias + (this.learningRate * delta))
                }
            }
        }
        clone(nw) {
            let input = nw.inputs
            let perc = new Network(input, nw.setup)
            for (let t = 0; t < nw.structure.length; t++) {
                for (let k = 0; k < nw.structure[t].length; k++) {
                    perc.structure[t][k] = new Perceptron([0, 0, 0, 0, 0, 0, 0])
                    for (let f = 0; f < nw.structure[t][k].weights.length; f++) {
                        perc.structure[t][k].weights[f] = nw.structure[t][k].weights[f]
                        perc.structure[t][k].bias = nw.structure[t][k].bias
                    }
                }
            }
            return perc
        }
        compute(inputs = this.inputs) {
            this.inputs = [...inputs]
            for (let t = 0; t < this.structure.length; t++) {
                for (let k = 0; k < this.structure[t].length; k++) {
                    if (t == 0) {
                        this.structure[t][k].compute(this.inputs)
                    } else {
                        this.structure[t][k].compute(this.structure[t - 1])
                    }
                }
            }
            this.outputs = []
            this.dataoutputs = []
            for (let t = 0; t < this.structure[this.structure.length - 1].length; t++) {
                this.outputs.push(this.structure[this.structure.length - 1][t].valueOf())
                this.dataoutputs.push(new Data(this.structure[this.structure.length - 1][t].valueOf()))
            }
        }
    }
    class Data {
        constructor(input = -100) {
            this.delta = 0
            this.outputConnections = []
            if (input == -100) {
                this.value = this.weight()
            } else {
                this.value = input
            }
        }
        valueOf() {
            return this.value
        }
        weight() {
            return Math.random() - .5
        }
    }
    TIP_engine.x = 350
    TIP_engine.y = 350
    let inpiut = []
    for(let t = 0;t<36;t++){
        let data = new Data(Math.random())
        inpiut.push(data)
    }
    let perc = new Network(inpiut, [24,18,12,2])//, new Data(0), new Data(0), new Data(0)
    perc.becomeNetworkFrom(roundnet)
//10000000
//[new Data(1), new Data(0)]
    // for (let t = 0; t < 1000000; t++) {
    //     let r1 = Math.random()
    //     let r2 = Math.random()
    //     let inputs = [new Data(r1), new Data(r2)]
    //     let goals = [new Data(r1), new Data(r2)]
    //     perc.compute(inputs)
    //     // let circle = new Circle(perc.outputs[0] * 500, perc.outputs[1] * 500, 3, "red")
    //     // circle.draw()
    //     perc.calculateDeltasSigmoid(goals)
    //     perc.adjustWeights()
    // }


    class Viewer {
        constructor(net) {
            this.net = net
        }
        draw() {
            let layers = this.net.structure.length + 1
            this.circles = []
            this.lines = []
            let step = canvas.height / (layers + 2)
            for (let t = -1; t < this.net.structure.length; t++) {
                let circlayer = []
                if (t == -1) {
                    let chunk = canvas.width / (this.net.inputs.length + 1)
                    for (let k = 0; k < this.net.inputs.length; k++) {
                        let tint = Math.max((this.net.inputs[k]), 0)
                        let circ = new Circle(chunk * (k + 1), step * (t + 2), 10, `rgba(255,255,255,${tint})`)
                        circlayer.push(circ)
                    }
                } else {
                    let chunk = canvas.width / (this.net.structure[t].length + 1)
                    for (let k = 0; k < this.net.structure[t].length; k++) {
                        let circ = new Circle(chunk * (k + 1), step * (t + 2), 10, `rgba(255,255,255,${this.net.structure[t][k].valueOf()})`)
                        for (let g = 0; g < this.net.structure[t][k].weights.length; g++) {
                            //console.log(this.circles, this.net.structure[t][k].weights, g)
                            let link = new LineOP(circ, this.circles[t][g], "white", 3 * Math.abs(this.net.structure[t][k].weights[g].valueOf()))
                            link.width = 1 * Math.abs(this.net.structure[t][k].weights[g].valueOf())
                            if (this.net.structure[t][k].weights[g].valueOf() < 0) {
                                link.color = "red"
                            } else {
                                link.color = "#00ff00"
                            }
                            this.lines.push(link)
                        }
                        circlayer.push(circ)
                    }
                }
                this.circles.push(circlayer)
            }


            for (let t = 0; t < this.lines.length; t++) {
                this.lines[t].draw()
            }
            for (let t = 0; t < this.circles.length; t++) {
                for (let k = 0; k < this.circles[t].length; k++) {
                    this.circles[t][k].draw()
                }
            }
        }
    }

    let pomao = []
    for(let t = 0;t<5;t++){
        let pomaoz = new Image()
        pomaoz.src = `a${t}.png`
        pomao.push(pomaoz)
    }
    let fruits = new Image()
    fruits.src = "fruitline.png"
    let num = 0
    // canvas_context.imageSmoothingEnabled = false
    // output_canvas_context.imageSmoothingEnabled = false


    let circ = new Circle(250,250, 100, "blue")
    let bigcirc = new Circle(250,250, 180, "black")

    let car = new Circle(385, 250, 2, "red")
    car.angle = Math.PI*.5
    let carline = new LineOP(circ,car)

    let primes = [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59]
    function main() {

        canvas_context.clearRect(0, 0, canvas.width, canvas.height)
        bigcirc.draw()
        circ.draw()


        let angle =(0)-(Math.PI*.99) // car.angle
        let inputs = []

        for(let t = angle;t<(0)+(Math.PI*.99);t+=((Math.PI*2)/36)){
            let point = new Circle(car.x, car.y, 1, "yellow")
            let link = new LineOP(circ, point)
            let lin2k = new LineOP(car, point, "orange", 1)
            let j = 0
            let cos = Math.cos(t+Math.PI)
            let sin = Math.sin(t+Math.PI)
            while(!((point.doesPerimeterTouch(circ)) || link.hypotenuse()>178)){
                j++
                if(j>100){
                    break
                }
                // point.draw()
                point.x += cos
                point.y += sin
            }

            lin2k.draw()
            point.draw()
            inputs.push(new Data(j/100))
        }
        // console.log(inputs)


        // let inputs = [new Data(TIP_engine.x / 500), new Data(TIP_engine.y / 500),new Data(TIP_engine.y / 500),new Data(TIP_engine.y / 500),new Data(TIP_engine.y / 500),new Data(TIP_engine.y / 500),new Data(TIP_engine.y / 500),new Data(TIP_engine.y / 500),new Data(TIP_engine.y / 500),new Data(TIP_engine.y / 500),]
        let goals =[new Data((Math.cos(carline.angle()+(Math.PI*.5))+1)*.5), new Data((Math.sin(carline.angle()+(Math.PI*.5))+1)*.5)]
        perc.compute(inputs)
        if(keysPressed['q']){
            perc.calculateDeltasSigmoid(goals)
            perc.adjustWeights()
        }

        car.x+= (perc.outputs[0]-.5)*5
        car.y+= (perc.outputs[1]-.5)*5

        // car.x-= (perc.outputs[2]-.5)*5
        // car.y-= (perc.outputs[3]-.5)*5




        while(car.doesPerimeterTouch(circ)){
            car.x -= Math.cos(carline.angle())
            car.y -= Math.sin(carline.angle())
        }
        while(carline.hypotenuse()>178){
            car.x += Math.cos(carline.angle())
            car.y += Math.sin(carline.angle())
        }
        car.angle = (new Line(0,0,perc.outputs[0]-.5, perc.outputs[1]-.5)).angle()
        car.draw()



        if(keysPressed['h']){
            perc.log()

            let vi = new Viewer(perc)
            vi.draw()
        }
        //     let vi = new Viewer(perc)
        //     vi.draw()
        //     // console.log(vi)
        //     // for(let t = 0;t<perc.structure.length;t++){
        //     //     for(let k = 0;t<perc.structure[k].length;k++){
        //     //         // delete perc.structure[t][k].outputConnections
        //     //     }
        //     // }
        // }
    }

})
