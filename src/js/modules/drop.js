const drop = () => {
    const fileInputs = document.querySelectorAll("[name='upload']");

    ["dragenter", "dragleave", "dragover", "drop"].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, preventDefaults, false);
        });
    });

    function preventDefaults(e) {
        e.preventDefaults();
        e.stopPropagation();
    }

    function highlight(item) {
        item.closest(".file_upload").style.border = "5px solid yellow";
        item.closest(".file_upload").style.backgroundColor = "rgba(0, 0, 0, .7";
    }

    function unhighlight(item) {
        item.closest(".file_upload").style.border = "none";

        if (item.closest(".calc_form")) {
            item.closest(".file_upload").style.backgroundColor = "white";
        } else {
            item.closest(".file_upload").style.backgroundColor = "ededed";
        }
        
    }

    ["dragenter", "dragover"].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, () => highlight(input), false);
        });
    });

    ["dragleave", "drop"].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, () => unhighlight(input), false);
        });
    });

    fileInputs.forEach(a => {
        a.addEventListener("drop", (e) => {
            a.files = e.dataTransfer.files;
            let dots;

            const arr = a.files[0].name.split(".");

            if (arr[0].length > 6) {
                dots = "...";
            } else {
                dots = ".";
            }

            const name = arr[0].substring(0, 6) + dots + arr[1];

            a.previousElementSibling.textContent = name;
        });
    });
};

export default drop;