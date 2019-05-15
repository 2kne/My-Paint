var click = false;
var canvas = $('#carre')[0].getContext('2d');
var started = true;
var button = {
    crayon: false,
    gomme: false,
    ligne: false,
    rectangle: false,
    cercle: false,
};
var cercle = 0;
var rectangle = 0;
var first = 0;
var rempli = 0;

var img = false;

$(window).on('load', function () {
    $('#vide').css('background-color', 'yellow');
    console.log($('#img').val());
});

$('#rempli').on('click', function () {
    $('#rempli').css('background-color', 'yellow');
    $('#vide').css('background-color', '');
    rempli = 1;
});

$('#vide').on('click', function () {
    $('#vide').css('background-color', 'yellow');
    $('#rempli').css('background-color', '');
    rempli = 0;
});

$('.control button').each(function (e) {
    $(this).on('click', function (e) {
        set_options(this.id);
        if (this.id == 'rectangle' || this.id == 'cercle') {
            $('#remplissage').css('display', 'block');
        } else {
            $('#remplissage').css('display', 'none');
        }
    })
});

$('#carre').on('mousedown', function () {
    click = true;
});

$('#carre').on('mouseup', function () {
    click = false;
    started = true;
});

$('#carre').on('mousemove', function (e) {
    x = e.pageX;
    y = e.pageY;
    if (click === true && button.crayon == true || button.gomme == true && click === true) {
        draw(x, y);
    }
});

$('#carre').on('click', function (e) {


    x = e.pageX;
    y = e.pageY;
    if (button.ligne == true && first == 0) {
        draw_line(x, y);

    }
    if (button.ligne == true && first == 1) {
        draw_line(x, y);
    }
    if (first == 1) {
        first = 0;
    } else {
        first = 1;
    }
});

$('#carre').on('click', function (e) {
    x_rec = e.pageX;
    y_rec = e.pageY;
    if (button.rectangle == true && rectangle == 0) {
        draw_rectangle(x_rec, y_rec);

    }
    if (button.rectangle == true && rectangle == 1) {
        draw_rectangle(x_rec, y_rec);
    }
    if (rectangle == 1) {
        rectangle = 0;
    } else {
        rectangle = 1;
    }
});

$('#carre').on('click', function (e) {
    x_cer = e.pageX;
    y_cer = e.pageY;
    if (button.cercle == true && cercle == 0) {
        draw_cercle(x_cer, y_cer);

    }
    if (button.cercle == true && cercle == 1) {
        draw_cercle(x_cer, y_cer);
    }
    if (cercle == 1) {
        cercle = 0;
    } else {
        cercle = 1;
    }
});

function draw(xPos, yPos) {
    var color = $('input[type=color]').val();
    if (button.gomme == true) {
        color = 'white';
    }
    if (started == true) {

        canvas.beginPath();
        canvas.strokeStyle = color;
        canvas.moveTo(xPos - $('canvas').offset().left, yPos - $('canvas').offset().top);
        started = false
    } else {
        canvas.lineTo(xPos - $('canvas').offset().left, yPos - $('canvas').offset().top);
        canvas.lineWidth = $('input[type=range]').val();
        canvas.stroke();

    }
}

function draw_line(xPos, yPos) {

    var color = $('input[type=color]').val();
    if (first == 0) {
        x1 = xPos - $('canvas').offset().left;
        y1 = yPos - $('canvas').offset().top;
    } else if (first == 1) {
        canvas.beginPath();
        canvas.strokeStyle = color;
        canvas.moveTo(x1, y1);
        canvas.lineTo(xPos - $('canvas').offset().left, yPos - $('canvas').offset().top);
        canvas.lineWidth = $('input[type=range]').val();
        canvas.stroke();

    }
}

function draw_rectangle(xPos, yPos) {

    var color = $('input[type=color]').val();
    if (rectangle == 0) {
        x1 = xPos - $('canvas').offset().left;
        y1 = yPos - $('canvas').offset().top;
    } else if (rectangle == 1) {
        canvas.beginPath();
        canvas.strokeStyle = color;
        canvas.lineWidth = $('input[type=range]').val();
        if (rempli == 1) {
            canvas.fillStyle = color;
            canvas.fillRect(x1, y1, xPos - $('canvas').offset().left - x1, yPos - $('canvas').offset().top - y1);
        } else {
            canvas.strokeRect(x1, y1, xPos - $('canvas').offset().left - x1, yPos - $('canvas').offset().top - y1);
        }
    }
}

function draw_cercle(xPos, yPos) {

    var color = $('input[type=color]').val();
    if (cercle == 0) {
        x1 = xPos - $('canvas').offset().left;
        y1 = yPos - $('canvas').offset().top;
    } else if (cercle == 1) {
        canvas.beginPath();
        canvas.strokeStyle = color;
        canvas.lineWidth = $('input[type=range]').val();
        var a = x1 - (xPos - $('canvas').offset().left);
        var b = y1 - (yPos - $('canvas').offset().top);
        var c1 = a * a;
        var c2 = b * b;
        var rayon = Math.sqrt(c1 + c2);
        canvas.arc(x1, y1, rayon, 0, 2 * Math.PI);
        if (rempli == 1) {
            canvas.fillStyle = color;
            canvas.fill()
        } else {
            canvas.stroke()
        }
    }
}

function set_options(set) {
    for (var ref in button) {
        if (ref != set) {
            button[ref] = false;
            $("#" + ref).css('background-color', '');
        } else if (ref == set) {
            button[ref] = true;
            $("#" + ref).css('background-color', 'red');
        }
    }
}

document.getElementById('img').onchange = function (e) {

    var img = new Image();
    img.onload = draw_img;
    img.src = URL.createObjectURL(this.files[0]);

};

function draw_img() {
    if (img === false) {
        var canvas = document.getElementById('carre');
        canvas.width = this.width;
        canvas.height = this.height;
        var ctx = canvas.getContext('2d');
        ctx.drawImage(this, 0, 0);
    }
    img = true;
}

/*$(window).on("mousemove", function () {
    var data = $('#carre')[0].toDataURL();
    $('#dl').attr('href', data)
});*/

setInterval(function(){
    var data = $('#carre')[0].toDataURL();
    $('#dl').attr('href', data)
}, 500);


