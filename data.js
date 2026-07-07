/* ==========================================================
   Gong Filename Interpreter
   data.js
   ----------------------------------------------------------
   เก็บข้อมูลอ้างอิงทั้งหมด (Metadata)
   หากมีรหัสใหม่ ให้แก้ไขไฟล์นี้เท่านั้น
========================================================== */

// ==========================
// Table 1
// Naming Convention
// ==========================

const TYPE_CODES = {
    forged: {
        th: "ฆ้องตี",
        en: "Forged Gong"
    },

    cast: {
        th: "ฆ้องหล่อ",
        en: "Cast Gong"
    },

    ideal: {
        th: "ฆ้องตีในอุดมคติ",
        en: "Ideal Forged Gong"
    }
};

const MALLET_CODES = {

    mai01: {
        th: "ไม้หนัง",
        en: "Hide-covered mallet"
    },

    mai02: {
        th: "ไม้นวม",
        en: "Soft-padded mallet"
    }

};

const BALANCE_CODES = {

    weighted: {
        th: "ถ่วงตะกั่ว",
        en: "Lead-weighted"
    },

    unweighted: {
        th: "ไม่ถ่วงตะกั่ว",
        en: "Unweighted"
    }

};

const TECHNIQUE_CODES = {

    hnong:{
        th:"โหน่ง",
        en:"Hnong"
    },

    hnad:{
        th:"หนัด",
        en:"Hnad"
    },

    hnod:{
        th:"หนอด",
        en:"Hnod"
    },

    sadao:{
        th:"สะเดาะ",
        en:"Sadao"
    },

    hnae:{
        th:"แหนะ",
        en:"Hnae"
    }

};

const DESCRIPTOR_CODES = {

    raw:{
        th:"สัญญาณดิบ",
        en:"Raw waveform"
    },

    fft:{
        th:"สเปกตรัมความถี่",
        en:"FFT"
    },

    spectrogram:{
        th:"สเปกโตรแกรม",
        en:"Spectrogram"
    },

    loudness:{
        th:"ความดังตามมาตรฐาน ECMA-418",
        en:"ECMA-418 Loudness"
    },

    sharpness:{
        th:"ความคม",
        en:"Sharpness"
    },

    roughness:{
        th:"ความหยาบ",
        en:"Roughness"
    }

};


// ==========================
// Table 2
// Experiment Metadata
// ==========================

const EXP_DATA = {

    exp01:{
        date:"14/03/2025",
        sampling:"50 kHz",
        mic:"1/4-inch sens01",
        batches:{}
    },

    exp02:{
        date:"29/07/2025",
        sampling:"100 kHz",
        mic:"1/2-inch sens02",
        batches:{}
    },

    exp03:{
        date:"03/10/2026",
        sampling:"100 kHz",

        batches:{

            n10_01:{
                source:"ชุด 1",
                sourceEn:"Batch 1",
                link:"https://drive.google.com/file/d/1JNfj83hdrUBdQZxchmqMg6wQB1pZeuKi/view?usp=drive_link"
            },

            n10_02:{
                source:"ชุด 2",
                sourceEn:"Batch 2",
                link:"https://drive.google.com/file/d/1JNfj83hdrUBdQZxchmqMg6wQB1pZeuKi/view?usp=drive_link"
            },

            n10_03:{
                source:"ชุด 3",
                sourceEn:"Batch 3" ,
                link:"https://drive.google.com/file/d/1JNfj83hdrUBdQZxchmqMg6wQB1pZeuKi/view?usp=drive_link"
            }

        }

    },

    exp04:{
        date:"29/05/2026",
        sampling:"100 kHz",

        batches:{

            n10_01:{
                source:"ชุด 1",
                sourceEn:"Batch 1",
                link:"https://drive.google.com/file/d/1JNfj83hdrUBdQZxchmqMg6wQB1pZeuKi/view?usp=drive_link"
            },

            n10_02:{
                source:"ชุด 2",
                sourceEn:"Batch 2",
                link:"https://drive.google.com/file/d/1JNfj83hdrUBdQZxchmqMg6wQB1pZeuKi/view?usp=drive_link"
            }

        }

    },

    exp05:{
        batches:{}
    }

};


// ==========================
// Table 3
// Microphone Metadata
// ==========================

const SENS_DATA = {

    sens01:{

        mic:"1/4-inch Type 40PH",

        sensitivity:"59.75 mV/Pa (−24.47 dB re. 1 V/Pa)",

        note:"Calibration @ 250 Hz, ±0.06 dB"

    },

    sens02:{

        mic:"1/2-inch Type 40EH (Type 40HF Low-noise Measuring System)",

        sensitivity:"1.06 V/Pa (0.51 dB re. 1 V/Pa)",

        note:"Calibration sensitivity"

    }

};

