/**
 * Created by flyin on 2016/4/26.
 */
function checked_img() {
    var radios = $("input");
    var checked_img;
    for (var i = 0; i < radios.length; i++) {
        checked_img = $(radios[i]).parent().find("img");
        checked_img.removeClass("checked-img");
        if (radios[i].checked) {
            try {
                checked_img.addClass("checked-img");
            } finally {

            }
        } else {
            checked_img.removeClass("checked-img");
        }
    }
}