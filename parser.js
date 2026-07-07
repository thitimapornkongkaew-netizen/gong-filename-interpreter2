/* ==========================================================
   Gong Filename Interpreter
   parser.js
   ----------------------------------------------------------
   หน้าที่
   - แยกชื่อไฟล์
   - ตรวจสอบรูปแบบ
   - คืนค่าข้อมูลเป็น Object
========================================================== */


/**
 * สร้างข้อความภาษาไทย / อังกฤษ
 */
function bilingual(codeObj, code) {

    if (codeObj) {

        return (
            codeObj.th +
            ' <span style="color:var(--text-mute);font-weight:400;">/ ' +
            codeObj.en +
            '</span>'
        );

    }

    return (
        code +
        ' <span style="color:var(--rust);font-weight:500;">(ไม่พบในตาราง / not found)</span>'
    );

}


/**
 * แยกหมายเลขฆ้อง
 */
function parseGong(gong) {

    const match = gong.match(/^(n\d+)(?:_(\d+))?$/);

    if (!match) {

        return null;

    }

    return {

        raw: gong,

        number: match[1],

        mainNumber: match[1].replace("n", ""),

        batch: match[2] || null

    };

}


/**
 * ตรวจสอบชื่อไฟล์
 */
function parseFilename(filename) {

    if (!filename) {

        return null;

    }

    const cleanName = filename
        .trim()
        .replace(/\.[^.]+$/, "");

    const regex =
        /^([a-zA-Z]+)-([a-zA-Z]+\d{2})-([a-zA-Z]+\d+(?:_\d+)?)-([a-zA-Z]+\d{2})-([a-zA-Z]+)-([a-zA-Z]+)-([a-zA-Z]+\d{2})_([a-zA-Z]+)(?:\((\d+)\))?$/;

    const match = cleanName.match(regex);

    if (!match) {

        return null;

    }

    const [

        ,

        type,

        mallet,

        gong,

        exp,

        balance,

        technique,

        sens,

        descriptor,

        repeat

    ] = match;

    return {

        type,

        mallet,

        gong,

        exp,

        balance,

        technique: technique.toLowerCase(),

        sens,

        descriptor,

        repeat: repeat || null,

        gongInfo: parseGong(gong)

    };

}