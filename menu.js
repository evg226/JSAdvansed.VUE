function setMenuVisible() {
    if (window.innerWidth <= 768) {
        app.isVisibleHambIcon = true;
        app.isMenuVisible = false;
    } else {
        app.isVisibleHambIcon = false;
        app.isMenuVisible = true;
    }
}
window.addEventListener("resize",setMenuVisible);
setMenuVisible();