const imageInput =
    document.getElementById("imageInput");

const uploadButton =
    document.getElementById("uploadButton");

const uploadArea =
    document.getElementById("uploadArea");

const previewSection =
    document.getElementById("previewSection");

const previewImage =
    document.getElementById("previewImage");

const settings =
    document.getElementById("settings");

const translateButton =
    document.getElementById("translateButton");

const removeImage =
    document.getElementById("removeImage");

const themeButton =
    document.getElementById("themeButton");

const progress =
    document.getElementById("progress");

const progressFill =
    document.getElementById("progressFill");

const progressText =
    document.getElementById("progressText");

const progressPercent =
    document.getElementById("progressPercent");

const resultSection =
    document.getElementById("resultSection");

const resultImage =
    document.getElementById("resultImage");

const downloadButton =
    document.getElementById("downloadButton");


let selectedFile = null;


/* فتح اختيار الصورة */

uploadButton.addEventListener(
    "click",
    () => imageInput.click()
);


/* اختيار الصورة */

imageInput.addEventListener(
    "change",
    handleImage
);


function handleImage(event) {

    const file =
        event.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {

        alert("الرجاء اختيار صورة.");

        return;
    }

    selectedFile = file;

    const reader =
        new FileReader();

    reader.onload = function(e) {

        previewImage.src =
            e.target.result;

        uploadArea.classList.add("hidden");

        previewSection.classList.remove("hidden");

        settings.classList.remove("hidden");

        translateButton.classList.remove("hidden");

        resultSection.classList.add("hidden");

    };

    reader.readAsDataURL(file);
}


/* حذف الصورة */

removeImage.addEventListener(
    "click",
    reset
);


function reset() {

    selectedFile = null;

    imageInput.value = "";

    previewImage.src = "";

    uploadArea.classList.remove("hidden");

    previewSection.classList.add("hidden");

    settings.classList.add("hidden");

    translateButton.classList.add("hidden");

    progress.classList.add("hidden");

    resultSection.classList.add("hidden");

}


/* زر الترجمة */

translateButton.addEventListener(
    "click",
    startTranslation
);


function startTranslation() {

    if (!selectedFile) return;


    /*
       مؤقتًا سنحاكي عملية الترجمة.

       لاحقًا سنستبدل هذا الجزء
       بطلب API حقيقي.
    */

    translateButton.disabled = true;

    progress.classList.remove("hidden");

    let percent = 0;

    const steps = [

        "رفع الصورة...",

        "اكتشاف النص...",

        "قراءة النص...",

        "ترجمة النص...",

        "تجهيز الصورة..."

    ];

    let step = 0;


    const timer =
        setInterval(() => {

            percent += 5;

            progressFill.style.width =
                percent + "%";

            progressPercent.textContent =
                percent + "%";


            if (
                percent % 20 === 0 &&
                step < steps.length
            ) {

                progressText.textContent =
                    steps[step];

                step++;

            }


            if (percent >= 100) {

                clearInterval(timer);

                finishDemo();

            }

        }, 120);

}


/*
   هذه دالة مؤقتة.

   حاليًا تعرض الصورة الأصلية
   حتى نتأكد أن الواجهة تعمل.

   لاحقًا ستستقبل الصورة
   المترجمة من الـ Backend.
*/

function finishDemo() {

    resultImage.src =
        previewImage.src;

    resultSection.classList.remove(
        "hidden"
    );

    translateButton.disabled = false;

}


/* تحميل النتيجة */

downloadButton.addEventListener(
    "click",
    () => {

        if (!resultImage.src) return;

        const link =
            document.createElement("a");

        link.href =
            resultImage.src;

        link.download =
            "manga-translated.png";

        link.click();

    }
);


/* الوضع الليلي / الفاتح */

themeButton.addEventListener(
    "click",
    () => {

        document.body.classList.toggle(
            "light"
        );

        if (
            document.body.classList.contains(
                "light"
            )
        ) {

            themeButton.textContent = "🌙";

        } else {

            themeButton.textContent = "☀️";

        }

    }
);
