/* ==========================================================
   Gong Filename Interpreter
   render.js
   ----------------------------------------------------------
   หน้าที่
   - สร้าง HTML
   - แสดงผลการตีความ
========================================================== */


/**
 * สร้างแถวข้อมูล
 */
function row(labelTh, labelEn, value, ok = true) {

    return `
        <div class="row">

            <span class="label">

                ${labelTh}

                <span class="en">

                    ${labelEn}

                </span>

            </span>

            <span class="value${ok ? "" : " err"}">

                ${value}

            </span>

        </div>
    `;

}


/**
 * Render Result
 */
function render(filename) {

    const out = document.getElementById("fn-output");

    // -----------------------
    // Empty
    // -----------------------

    if (!filename || filename.trim() === "") {

        out.innerHTML = `
            <p class="empty-hint">

                ผลลัพธ์การตีความจะแสดงที่นี่

                <span class="en">

                    Your interpreted result will appear here

                </span>

            </p>
        `;

        return;

    }

    // -----------------------
    // Parse
    // -----------------------

    const parsed = parseFilename(filename);

    const satMatch = checkSaturationNote(filename);
    
    const gainInfo = checkGainMetadata(filename);
    const gainBox = gainInfo
        ? `
           <div class="note-box">

               🎚️ <strong>Recording Gain</strong><br>

               Gain: <b>${gainInfo.gain}</b><br>

               Overall System Sensitivity:
               <b>${gainInfo.sensitivity}</b>

               <br><br>

               ${gainInfo.noteTh}

               <span class="en">

                   ${gainInfo.noteEn}

               </span>

           </div>
       `
       : "";
   
    const satBox = satMatch
        ? `
            <div class="note-box gain">

                ⚠️ ไฟล์นี้ (${satMatch}) มีการตัดพีคที่มีค่าเกินออก
                เนื่องจากสัญญาณอิ่มตัว (saturate)
                จึงเหลือพีคอยู่เพียงไม่กี่จุดในไฟล์ผลลัพธ์

                <span class="en">

                    This file (${satMatch}) had peaks exceeding
                    the valid range removed due to signal saturation
                    (clipping) — only a small number of peaks remain
                    in the result.

                </span>

            </div>
        `
        : "";

    if (!parsed) {

        out.innerHTML = `
            ${satBox}

            <div class="error-box">

                รูปแบบชื่อไฟล์นี้ไม่ตรงกับธรรมเนียมการตั้งชื่อ

                <br>

                รูปแบบที่ถูกต้อง:

                <br><br>

                [type]-maiXX-nXX[_XX]-expXX-balance-technique-sensXX_descriptor

                <span class="en">

                    Filename does not match the naming convention.

                </span>

            </div>
        `;

        return;

    }

    // -----------------------
    // Load Metadata
    // -----------------------

    const typeObj = TYPE_CODES[parsed.type];

    const malletObj = MALLET_CODES[parsed.mallet];

    const balanceObj = BALANCE_CODES[parsed.balance];

    const techObj = TECHNIQUE_CODES[parsed.technique];

    const descObj = DESCRIPTOR_CODES[parsed.descriptor];

    const expData = EXP_DATA[parsed.exp];

    const sensData = SENS_DATA[parsed.sens];

    // -----------------------
    // Gong Name
    // -----------------------

    let gongTH = parsed.gong;

    let gongEN = parsed.gong;

    if (parsed.gongInfo) {

        gongTH =
            "ฆ้องหมายเลข " +
            parsed.gongInfo.mainNumber;

        gongEN =
            "Gong No. " +
            parsed.gongInfo.mainNumber;

        if (parsed.gongInfo.batch) {

            gongTH +=
                " ชุด " +
                parseInt(parsed.gongInfo.batch);

            gongEN +=
                " Batch " +
                parseInt(parsed.gongInfo.batch);

        }

    }

    // -----------------------
    // Summary
    // -----------------------

    const summary = [

        typeObj ? typeObj.th : parsed.type,

        malletObj ? malletObj.th : parsed.mallet,

        gongTH,

        parsed.exp,

        balanceObj ? balanceObj.th : parsed.balance,

        techObj ? techObj.th : parsed.technique,

        parsed.sens

    ];

    let html = "";

    html += satBox;
    html += gainBox;

    html += `

        <div class="summary-line">

            ${summary.join(" - ")}

            ${parsed.repeat
                ? `(บันทึกซ้ำครั้งที่ ${parsed.repeat})`
                : ""}

        </div>

    `;

    // -----------------------
    // Main Table
    // -----------------------

    html += row(

        "ชนิด",

        "Type",

        bilingual(typeObj, parsed.type),

        !!typeObj

    );

    html += row(

        "ไม้ตี",

        "Mallet",

        bilingual(malletObj, parsed.mallet),

        !!malletObj

    );

    html += row(

        "หมายเลขฆ้อง",

        "Gong",

        `${gongTH}
        <span style="color:var(--text-mute);font-weight:400;">
        / ${gongEN}
        </span>`,

        true

    );

    html += row(

        "การทดลอง",

        "Experiment",

        parsed.exp,

        !!expData

    );

    html += row(

        "ถ่วงน้ำหนัก",

        "Balance",

        bilingual(balanceObj, parsed.balance),

        !!balanceObj

    );

    html += row(

        "เทคนิค",

        "Technique",

        bilingual(techObj, parsed.technique),

        !!techObj

    );

    html += row(

        "Sensitivity",

        "Sensitivity",

        parsed.sens,

        !!sensData

    );
    if (gainInfo) {

    html += row(

        "Recording Gain",

        "Recording Gain",

        gainInfo.gain,

        true

    );

    html += row(

        "Overall System Sensitivity",

        "Overall System Sensitivity",

        gainInfo.sensitivity,

        true

    );

}

    html += row(

        "ประเภทไฟล์",

        "Descriptor",

        bilingual(descObj, parsed.descriptor),

        !!descObj

    );

    if (parsed.repeat) {

        html += row(

            "บันทึกซ้ำ",

            "Repeat",

            `ครั้งที่ ${parsed.repeat} / Take ${parsed.repeat}`,

            true

        );

    }


        // -----------------------
    // Experiment Details
    // -----------------------

    html += `

        <div class="subpanel">

            <p class="section-label">

                รายละเอียดการทดลอง (${parsed.exp})

                <span class="en">

                    / Experiment Details

                </span>

            </p>

    `;

    if (expData) {

        html += row(

            "วันที่บันทึก",

            "Recording Date",

            expData.date || "-",

            true

        );

        html += row(

            "Sampling Rate",

            "Sampling Rate",

            expData.sampling || "-",

            true

        );

        if (expData.mic) {

            html += row(

                "ไมโครโฟน",

                "Microphone",

                expData.mic,

                true

            );

        }

        if (expData.batches) {

            const batch = expData.batches[parsed.gong];

            if (batch) {

                html += row(

                    "แหล่งที่มา",

                    "Source",

                    `${batch.source}
                    <span style="color:var(--text-mute);font-weight:400;">
                    / ${batch.sourceEn}
                    </span>`,

                    true

                );

                if (batch.link) {

                    html += row(

                        "ภาพอ้างอิง",

                        "Reference Image",

                        `<a href="${batch.link}"
                           target="_blank"
                           rel="noopener">
                           เปิดลิงก์ / Open Link
                         </a>`,

                        true

                    );

                }

            }

        }

    }

    else {

        html += `

            <div class="error-box">

                ไม่พบข้อมูลการทดลอง

                ${parsed.exp}

                <span class="en">

                    Experiment metadata not found.

                </span>

            </div>

        `;

    }

    html += `</div>`;



    // -----------------------
    // Microphone Details
    // -----------------------

    html += `

        <div class="subpanel">

            <p class="section-label">

                รายละเอียดไมโครโฟน (${parsed.sens})

                <span class="en">

                    / Microphone Details

                </span>

            </p>

    `;

    if (sensData) {

        html += row(

            "รุ่นไมโครโฟน",

            "Microphone Model",

            sensData.mic,

            true

        );

        html += row(

            "Sensitivity",

            "Sensitivity",

            sensData.sensitivity,

            true

        );

        html += row(

            "หมายเหตุ",

            "Note",

            sensData.note,

            true

        );

    }

    else {

        html += `

            <div class="error-box">

                ไม่พบข้อมูลไมโครโฟน

                ${parsed.sens}

                <span class="en">

                    Microphone metadata not found.

                </span>

            </div>

        `;

    }

    html += `</div>`;  

        html += `</div>`;

    // -----------------------
    // Show Result
    // -----------------------

    out.innerHTML = html;

}

