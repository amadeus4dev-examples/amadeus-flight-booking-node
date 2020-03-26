<template>
    <div>

        <section class="text">
            <h3>Hey everyone look at this</h3>
            <h1><span class="fontawesome-star star"></span> <span>Awesome Modern travel agency</span> <span class="fontawesome-star star"></span></h1>
        </section>

    </div>
</template>

<script>
export default {
    name: 'Intro',

}
</script>

<style scoped>
h1 {
    font-weight: bold;
    text-align: center;
    position: relative;
    font-size: 5rem;

    transform: translate(10%, -90%);
}

a {
    text-decoration: none;
}

#btn1 {
    top: 200px;
}

#btn2 {
    top: 500px;
}

#btn3 {
    top: 800px;
}

div.button {
    background-color: #448aff;
    color: #2c3e50;
    border: none;
    border-radius: 30px;
    width: 500px;
    height: 200px;
    position: fixed;
    left: -435px;
    transition: .7s ease;
    margin: 1%;

}

div.button:hover {
    background-color: black;
    position: fixed;
    left: -50px;
    width: 600px;
    border-radius: 15px;
    box-shadow: 0px 5px 0px grey;
}

div.button:active {
    background-color: #2c3e50;
    transition: 0s;
    color: #ecf0f1;
}

@import url(https://fonts.googleapis.com/css?family=Oswald:400|Open+Sans:700);

@import url(http://weloveiconfonts.com/api/?family=fontawesome);

/* fontawesome */
[class*="fontawesome-"]:before {
    font-family: 'FontAwesome', sans-serif;
}

body {
    background: #e6e6d8 url('https://dl.dropboxusercontent.com/s/t0gu051d08sei65/bg-retro-noise.png');
    color: #121212;
}

section.text {
    position: absolute;
    width: 100%;
    min-width: 1000px;
    text-align: center;
    top: 50%;
    margin-top: -55px;
}

h1,
h3 {
    transform: matrix(1, -0.20, 0, 1, 0, 0);
    -ms-transform: matrix(1, -0.20, 0, 1, 0, 0);
    -webkit-transform: matrix(1, -0.20, 0, 1, 0, 0);
}

@import url('https://fonts.googleapis.com/css?family=Luckiest+Guy&display=swap');

h1 {
    font-family: 'Luckiest Guy', cursive;
    text-transform: uppercase;
    font-weight: 400;
    font-size: 70px;

}

h1 span {
    display: inline-block;
    vertical-align: middle;
}

span.star {
    font-size: 20px;
}

h3 {
    font-family: "Open Sans", Sans-serif;
    text-transform: uppercase;
    font-weight: 700;
    font-size: 20px;
    letter-spacing: 0.1em;
    margin-bottom: 10px;
    position: relative;
}

h3:before,
h3:after {
    content: " ";
    position: absolute;
    width: 100px;
    height: 4px;
    border-top: 2px solid #121212;
    border-bottom: 2px solid #121212;
}

h3:before {
    margin: 5px 0 0 -110px;
}

h3:after {
    margin: 5px 0 0 10px;
}

b {
    position: relative;
    display: block;
    font-family: helvetica neue, helvetica, sans-serif;
    line-height: 1.15em;
    margin-top: -1.15em;
    top: 2.3em;
    font-size: 0.67em;
    font-weight: 400;
    letter-spacing: 0.025em;
    opacity: 0.75;
    text-align: center;
}

b span {
    font-size: 0.785em;
    font-weight: 400;
    opacity: 0.4;
}

#intro {
    width: 200px;
    margin: 100px auto 0;
}

.button {
    display: inline-block;
    text-decoration: none;
    position: relative;
    margin-top: 40px;
}

.button .bottom {
    position: absolute;
    left: 7px;
    top: 7px;
    width: 100%;
    height: 100%;
    background-color: #448aff;
    display: block;
    -webkit-transition: all .15s ease-out;
    transition: all .15s ease-out;
}

.button .top {
    position: relative;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    padding: 24px 34px 22px 34px;
    border: 2px solid #04049d;
}

.button-dark .top {
    border: 2px solid #fff;
}

.button .top .label {
    font-family: sans-serif;
    font-weight: 600;
    color: #04049d;
    font-size: 12px;
    line-height: 110%;
    letter-spacing: 2px;
    text-align: center;
    text-transform: uppercase;
    -webkit-transition: all .15s ease-out;
    -moz-transition: all .15s ease-out;
    -o-transition: all .15s ease-out;
    transition: all .15s ease-out;
}

.button-dark .top .label {
    color: #fff;
}

.button:hover .bottom {
    left: 0;
    top: 0;
    background-color: #f3f3f3;
}

.button:hover .top .label {
    color: #2acdc1;
}

.button-border {
    position: absolute;
    background-color: #2acdc1;
    -webkit-transition: all .25s ease-out;
    -moz-transition: all .25s ease-out;
    -o-transition: all .25s ease-out;
    transition: all .25s ease-out;
}

.button:hover .top .button-border-left,
.button:hover .top .button-border-right {
    height: calc(100% + 2px);
}

.button:hover .top .button-border-top,
.button:hover .top .button-border-bottom {
    width: calc(100% + 2px);
}

.button-border-left {
    left: -2px;
    bottom: -2px;
    width: 2px;
    height: 0;
}

.button-border-top {
    left: -2px;
    top: -2px;
    width: 0;
    height: 2px;
}

.button-border-right {
    right: -2px;
    top: -2px;
    width: 2px;
    height: 0;
}

.button-border-bottom {
    right: -2px;
    bottom: -2px;
    width: 0;
    height: 2px;
}
</style>