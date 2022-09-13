class Pie {

    constructor() {
        this.canvas = null;
        this.tooltip = null;
        this.ctx = null;
        this.colors = ["#815dc4", "#269ac8", "#ff9933",  "#2cb7aa", "#b867a7"];
        this.x = 0;
        this.y = 0;
        this.r = 0;
        this.lw = 10;
        this.angles = [];
        this.nrBlockedTrackers = 0;
    }

    init() {
        this.canvas = document.getElementById("pie");
        this.tooltip = document.getElementById("pie-tooltip");
        this.ctx = this.canvas.getContext("2d");
        this.ctx.lineWidth = this.lw;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.x = this.canvas.width / 2;
        this.y = this.x;
        this.r = this.x - this.lw / 2 - 0.1;
        this.setMouse();
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    update(trackers) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        var totalTrackers = trackers.reduce((a, b) => a + b);
        this.nrBlockedTrackers = totalTrackers;
        var parts = trackers.length;
        var start = 0;
        var grad = 0;
        //document.getElementById("pieCount").innerHTML = totalTrackers;
        document.getElementById("pieCount").firstChild.nodeValue = totalTrackers;
        for (var i = 0; i < parts; i++) {
            this.ctx.beginPath();
            this.ctx.strokeStyle = this.colors[i];
            grad = (Math.PI * 2) * trackers[i] / totalTrackers;
            this.ctx.arc(this.x, this.y, this.r, start, start + grad);
            this.ctx.stroke();

            this.angles.push([start, start + grad, i]);
            start += grad;
        }
    }

    mouseEnterEvent() {
        this.showTooltip();
    }

    mouseLeaveEvent() {
        this.hideTooltip();
    }

    mouseMoveEvent(evt) {
        var distance = 0;
        var angle = 0;
        var dx = evt.offsetX - this.x;
        var dy = -(evt.offsetY - this.x);
        this.tooltip.style.left = evt.offsetX - 40 + "px";
        this.tooltip.style.top = evt.offsetY + 10 + "px";

        if(0 === this.angles.length) {
            return;
        }

        angle = Math.atan2(dy, dx);

        if (angle < 0) {
            angle += Math.PI * 2;
        }
        angle = 2 * Math.PI - angle;

        let current = this.angles.filter(function (item) {
            if (item[0] <= angle && angle <= item[1]) {
                return true;
            }
            return false;
        });

        if ((null != current) && (current.length > 0)) {
            current = current[0][2];
           
            let label = document.querySelectorAll(".tooltip-labels div.show")[0];
            if (label) {
                label.classList.remove("show");
            }

            label = document.querySelectorAll(".tooltip-labels div").item(current);
            label.classList.add("show");

            distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
            if (distance < this.x - this.lw || distance > this.x + this.lw) {
                this.hideTooltip();
            } else {
               this.showTooltip();
            }
        }
    }
    
    setMouse() {
        this.canvas.addEventListener("mouseenter", this.mouseEnterEvent.bind(this));
        this.canvas.addEventListener("mouseleave", this.mouseLeaveEvent.bind(this));
        this.canvas.addEventListener("mousemove", this.mouseMoveEvent.bind(this));
    }

    hideTooltip() {
        this.tooltip.style.display = "none";
    }

    showTooltip() {
        if(this.nrBlockedTrackers > 0){
            this.tooltip.style.display = "block";
        }
    }
};

class PageLoad {

    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.lw = 8;
        this.x = 0;
        this.y = 0; 
        this.r = 0;
    }
   

    init() {
        this.canvas = document.getElementById("pageSpeed");
        this.ctx = this.canvas.getContext("2d");
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.x = this.canvas.width / 2;
        this.r = this.x - this.lw / 2 - 0.1;
    }

    clear() {
        indicator.style.transform = "rotate(0deg)";
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    update(val) {
        var gradient;
        var grad;
        var offset = 0.08;
        var start = Math.PI;
        var rotation = val / 100 * 182 - 91;

        var indicator = document.getElementById("indicator");
        indicator.style.transform = "rotate(" + rotation + "deg)";

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.beginPath();
        this.ctx.lineWidth = this.lw;

        grad = (Math.PI * 2) * val / 100.0 / 2 - start;

        if (val < 35) {
            gradient = this.ctx.createLinearGradient(0, 40, 20, 0);
            gradient.addColorStop(0, "#d90016");
            gradient.addColorStop(1, "#e15765");
            this.ctx.strokeStyle = gradient;
        } else if (val >= 35 && val < 55) {
            gradient = this.ctx.createLinearGradient(0, 40, 50, 0);
            gradient.addColorStop(0, "#ff9933");
            gradient.addColorStop(1, "#f7d360");
            this.ctx.strokeStyle = gradient;
        } else {
            gradient = this.ctx.createLinearGradient(0, 40, 80, 40);
            gradient.addColorStop(0, "#1f991f");
            gradient.addColorStop(1, "#42c942");
            this.ctx.strokeStyle = gradient;
        }

        this.ctx.arc(this.x, this.x, this.r, start - offset, grad);
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.strokeStyle = "#cccccc";
        this.ctx.arc(this.x, this.x, this.r, grad, 0 + offset);

        this.ctx.stroke();
    }
};

class PageTooltip {

    constructor() {
    }
   
    init() {
        var targets = document.querySelectorAll(".tooltip-target");
        if (null != targets) {
            targets.forEach(function (elem) {
                var tooltip = elem.querySelector(".info-tooltip");
                if (null != tooltip) {
                    elem.addEventListener("mouseover", function () {
                        var br = elem.getBoundingClientRect();
                        if (br.left > 240) {
                            if (!tooltip.classList.contains("left")) {
                                tooltip.classList.add("left");
                            }
                        } else {
                            if (tooltip.classList.contains("left")) {
                                tooltip.classList.remove("left");
                            }
                        }
                    })
                }
            });
        }
    }

};

export { Pie, PageLoad, PageTooltip }



