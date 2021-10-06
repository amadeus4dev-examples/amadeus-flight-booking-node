<template src="./result.html">

</template>
<style scoped lang="scss">
$spacingV : 10px;
$spacingH : 10px;
$bradius : 10px;

.displayflex {
    display: flex;
}

// Media queries 

@mixin bp($point) {
    @if $point==mobile {
        @media (max-width: 500px) {
            @content ;
        }
    }

    @else if $point==ipadV {
        @media (min-width: 501px) and (max-width:1023px) {
            @content ;
        }
    }

    @else if $point==ipadVMore {
        @media (min-width: 501px) {
            @content ;
        }
    }

    @else if $point==ipadHmore {
        @media (min-width: 1024px) {
            @content ;
        }
    }
}


// A bit of styling 

$text: #000000;
$orange:#69f0ae;
$label:#989898;
$bgc:#f9ebd2;

@mixin object-fit($fit: fill, $position: null) {
    -o-object-fit: $fit;
    object-fit: $fit;

    @if $position {
        -o-object-position: $position;
        object-position: $position;
        font-family: 'object-fit: #{$fit}; object-position: #{$position}';
    }

    @else {
        font-family: 'object-fit: #{$fit}';
    }
}

@import url('https://fonts.googleapis.com/css?family=Montserrat:400,600');

$fm: 'Montserrat',
Helvetica,
arial,
sans-serif;


body {
    margin: 0;
    padding: 0;
    font-family: $fm;
    letter-spacing: 0.75px;
    color: $text;
    background-color: $bgc;
    font-size: 16px;
}


h1,
h2,
h3,
h4,
h5,
h6,
p {
    margin: 0;
    padding: 0;
    font-weight: 400;
    font-size: 1.2em;
}

h1 {
    font-weight: 600;
    font-size: 2em;
}

h2 {
    color: $orange;
    font-size: 2rem;
}

h4,
h5 {
    color: $label;
    font-size: 0.8rem;
}

h6 {
    font-size: 1.6rem;
}

p {
    letter-spacing: 1px;
    color: white
}

.white p {
    letter-spacing: 1px;
    color: #69f0ae;
}

img {
    max-width: 100%;
    height: auto;
    max-height: 100%;
}

section,
header {

    display: flex;
    background-color: white;

    &>div,
        {}
}

header {
    >div {
        min-width: 200px;
    }
}

.flight {
    &--general {
        text-align: center;
        align-items: center;

        div {

            &:first-of-type,
            &:last-of-type {
                flex: 1 50%;
            }

            &:first-child {
                padding: $spacingV $spacingH;
            }
        }
    }

    &--qrcode {
        justify-content: center;
        align-items: center;

        height: 30vh;

        img {
            @include object-fit(contain);
            height: 100%;
        }
    }
}

.extra {
    &--meteo {
        p:last-of-type {
            font-size: 0.8rem;
        }
    }

    &--image {
        height: 100%;
        display: block;
        padding: 0;

        img {
            @include object-fit(cover);
            max-height: 100%;
            min-width: 100%;
        }
    }
}


header {
    background-color: $orange;
    color: $bgc;
    justify-content: flex-end;
    align-items: center;

    h1 {
        flex: 1 90%;
    }

    h5 {
        color: $bgc;
    }

    >div {
        flex: 1 10%;

        &:first-of-type {
            padding-left: 0;
        }
    }
}

@include bp(mobile) {

    section,
    header {
        padding: $spacingV $spacingH*2;
    }

    header {
        flex-wrap: wrap;
    }

    .flight--qrcode {}

    .extra--image {
        min-height: inherit;
    }


    .flight {
        &--general {
            display: -webkit-flex;
            display: -ms-flex;
            display: flex;
            align-items: center;

            div {
                &:first-of-type {
                    text-align: left;
                    padding-left: 0;
                }

                &:last-of-type {
                    text-align: right;
                    padding-right: 0;
                }
            }
        }
    }

    .extra {
        &--meteo {
            flex-direction: column;

            >div {
                width: 100%;
                padding-left: 0;
            }
        }

        &--image {
            img {
                height: auto;
                max-height: -webkit-fill-available;
            }
        }
    }
}


@include bp(ipadVMore) {

    section,
    h1,
    header div:first-of-type {}

    .flight--general {
        padding-bottom: 0;
    }

    .flight--TimeInfo {
        padding-top: 0;
    }

    .flight--qrcode {
        padding: 0 $spacingV;
    }

    .extra {
        &--meteo {
            justify-content: space-around;

            >div {
                max-width: 30%;

                &:last-of-type {
                    padding-right: 0;
                }
            }
        }
    }

}



@include bp(ipadHmore) {
    .flight--TimeInfo {
        padding-top: $spacingV;
    }

    .flight--qrcode {
        padding: 0 $spacingV;
    }
}




main {
    display: grid;
    display: block\9;
    max-width: 500px\9;
    margin: 0 auto;
}



//border radius
header {
    border-radius: $bradius $bradius 0 0;

    @include bp(mobile) {
        border-radius: 0;
    }
}

.flight {
    &--qrcode {
        border-radius: 0 0 $bradius 0;

        @include bp(mobile) {
            border-radius: 0;
        }
    }

    &--general {
        border-radius: 0 0 0 $bradius;
    }
}

.extra {
    &--meteo {
        border-radius: 10px;
    }

    &--image {
        display: flex;

        img {
            //height:100%;
        }
    }
}

@include bp(ipadV) {
    .flight {
        &--TimeInfo {
            border-radius: 0 0 0 $bradius;
        }

        &--general {
            border-radius: 0;
        }

        &--qrcode {
            justify-content: flex-end;
        }
    }
}

@include bp(ipadVMore) {
    main {
        height: 100vh;
    }

    .flight {
        &--qrcode {
            height: 100%;
            padding: 0;
        }
    }

    .extra {
        &--image {
            min-height: 100vh;
        }
    }
}

@supports (display: grid) {
    @include bp(ipadVMore) {
        .flight {
            &--qrcode {
                height: initial;
            }
        }
    }
}

@supports not (display: grid) {
    main {
        margin: 0 auto;
        max-width: 500px;
        grid-gap: 0 0;
        display: block;
    }

    //border radius
    header {
        border-radius: 0;

        @include bp(mobile) {
            border-radius: 0;
        }
    }

    .flight {
        &--qrcode {
            border-radius: 0;

            @include bp(mobile) {
                border-radius: 0;
            }
        }

        &--general {
            border-radius: 0;
        }
    }

    .extra {
        &--meteo {
            border-radius: 0;
        }

        &--image {
            min-height: inherit;
            display: block;
        }
    }

    @include bp(ipadV) {
        .flight {
            &--TimeInfo {
                border-radius: 0;
            }

            &--general {
                border-radius: 0;
            }

            &--qrcode {
                justify-content: center;
            }
        }
    }

    @include bp(ipadVMore) {
        main {
            height: inherit;
        }

        .flight {
            &--qrcode {
                height: initial;
            }
        }

        .extra {
            &--image {
                min-height: inherit;
            }
        }
    }
}




.extra {
    &--image {}

    &--meteo {
        z-index: 2;

        @include bp(ipadVMore) {
            justify-self: center;
        }
    }

}

@include bp(mobile) {
    main {
        grid-template-columns: 1fr 1fr;
    }

    header {
        grid-column: 1 / span 2;
        grid-row: 1 / span 1;
    }

    .flight {

        &--general,
        &--TimeInfo,
        &--PassInfo,
        &--qrcode {
            grid-column: 1 / span 2;
        }

        &--general {
            grid-row: 2 / span 1;
        }

        &--TimeInfo {
            grid-row: 3 / span 1;
        }

        &--PassInfo {
            grid-row: 4 / span 1;
        }

        &--qrcode {
            grid-row: 5 / span 1;
        }
    }

    .extra {

        &--meteo,
        &--image {
            grid-row: 6 / span 1;
        }

        &--meteo {
            grid-column: 1 / span 1;
        }

        &--image {
            grid-column: 2 / span 1;
        }
    }
}



@include bp(ipadV) {
    main {
        grid-template-columns: 1fr repeat(3, minmax(100px, 200px)) 1fr;
        grid-template-rows: 1fr 60px repeat(3, 75px) 10vh auto 1fr;
    }

    header {
        grid-column: 2 / span 3;
        grid-row: 2 / span 1;
        z-index: 2;
    }

    .flight {

        &--PassInfo,
        &--qrcode {
            z-index: 2;
        }

        &--general {
            grid-column: 2 / span 2;
            grid-row: 3 / span 1;
            z-index: 3;
        }

        &--TimeInfo {
            grid-column: 2 / span 2;
            grid-row: 5 / span 1;
            z-index: 3;
        }

        &--PassInfo {
            grid-column: 2 / span 2;
            grid-row: 4 / span 1;
        }

        &--qrcode {
            grid-column: 4 / span 1;
            grid-row: 3 / span 3;
        }
    }

    .extra {
        &--meteo {
            grid-column: 2 / span 3;
            grid-row: 7 / span 1;
        }

        &--image {
            grid-column: 1 / span 7;
            grid-row: 1 / span 8;
        }
    }
}


@include bp(ipadHmore) {
    main {
        grid-template-columns: 1fr repeat(4, 150px) 250px 1fr;
        grid-template-rows: 1fr 60px repeat(2, 100px) 0.5fr auto 1fr;
    }

    header {
        grid-column: 2 / span 5;
        grid-row: 2 / span 1;
        z-index: 2;
    }

    .flight {

        &--general,
        &--TimeInfo,
        &--PassInfo,
        &--qrcode {
            z-index: 2;
        }

        &--general {
            grid-column: 2 / span 2;
            grid-row: 3 / span 2;
        }

        &--TimeInfo {
            grid-column: 4 / span 2;
            grid-row: 3 / span 1;
        }

        &--PassInfo {
            grid-column: 4 / span 2;
            grid-row: 4 / span 1;
        }

        &--qrcode {
            grid-column: 6 / span 1;
            grid-row: 3 / span 2;
        }
    }

    .extra {

        &--meteo {
            grid-column: 2 / span 5;
            grid-row: 6 / span 1;
        }

        &--image {
            grid-column: 1 / span 7;
            grid-row: 1 / span 7;
            z-index: 1;
        }
    }
}
</style>
<script>
// import { store } from './store/store'
import {
    BadgerAccordion,
    BadgerAccordionItem
} from 'vue-badger-accordion'
/* eslint-disable no-mixed-spaces-and-tabs */
import Swal from 'sweetalert2/dist/sweetalert2.js'

import 'sweetalert2/src/sweetalert2.scss'
export default {
    data: function() {
        return {
            pricingConfirmation: "Thank you your order is confirmed",
            mojsOptions: {
                count: 6,
                radius: {
                    15: 100
                },
                origin: '100% 100%',
                degree: 360,
                children: {
                    shape: 'polygon',
                    fill: ['blue', 'white'],
                    isSwirl: true,
                    swirlSize: 10,
                    swirlFrequency: 2,
                    delay: 'stagger(0, 30)'
                }
            },
        }

    },
    name: 'app',
    menuVisible: false,
    components: {
        BadgerAccordion,
        BadgerAccordionItem,
    },
    created(){
            if (this.$store.getters.flavor.length < 1) {
                Swal.fire({
                    title: 'Error!',
                    text: 'Do you want to continue',
                    icon: 'error',
                    confirmButtonText: 'Cool'
                })
            } else {
                Swal.fire({
                    title: '<strong>Congratulation <u>your flight is confirmed</u></strong>',
                    icon: 'info',
                    html: 'You can use your confirmation number, ' +
                        // '<a href="//sweetalert2.github.io">links</a> ' +
                        'and enjoy your trip !',
                    showCloseButton: true,
                    showCancelButton: true,
                    focusConfirm: false,
                    confirmButtonText: '<i class="fa fa-thumbs-up"></i> Great!',
                    confirmButtonAriaLabel: 'Thumbs up, great!',
                    cancelButtonText: '<i class="fa fa-thumbs-down"></i>',
                    cancelButtonAriaLabel: 'Thumbs down'
                })
            }       
    },
    methods: {



    }
}
</script>

<style>

</style>
