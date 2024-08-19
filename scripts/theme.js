export const colors = [
    //-------------------- v1
    { light: `rgb(106, 160, 26)`, dark: `rgb(0, 60, 0)` },
    { light: `rgb(255, 87, 34)`, dark: `rgb(139, 0, 0)` },
    { light: `rgb(33, 150, 243)`, dark: `rgb(0, 0, 139)` },
    { light: `rgb(255, 193, 7)`, dark: `rgb(139, 69, 19)` },
    { light: `rgb(156, 39, 176)`, dark: `rgb(75, 0, 130)` },
    { light: `rgb(0, 188, 212)`, dark: `rgb(0, 100, 100)` },
    { light: `rgb(76, 175, 80)`, dark: `rgb(34, 139, 34)` },
    { light: `rgb(255, 235, 59)`, dark: `rgb(128, 128, 0)` },
    { light: `rgb(233, 30, 99)`, dark: `rgb(139, 0, 139)` },
    { light: `rgb(121, 85, 72)`, dark: `rgb(80, 50, 30)` },
    //-------------------- v2
    { light: `rgb(120, 170, 40)`, dark: `rgb(10, 70, 10)` },
    { light: `rgb(255, 102, 50)`, dark: `rgb(150, 10, 10)` },
    { light: `rgb(50, 160, 250)`, dark: `rgb(10, 10, 150)` },
    { light: `rgb(255, 210, 20)`, dark: `rgb(150, 80, 20)` },
    { light: `rgb(170, 50, 190)`, dark: `rgb(85, 10, 140)` },
    { light: `rgb(10, 200, 220)`, dark: `rgb(10, 110, 110)` },
    { light: `rgb(90, 190, 90)`, dark: `rgb(40, 150, 40)` },
    { light: `rgb(255, 245, 70)`, dark: `rgb(140, 140, 10)` },
    { light: `rgb(245, 40, 110)`, dark: `rgb(150, 10, 150)` },
    { light: `rgb(130, 95, 80)`, dark: `rgb(90, 60, 40)` },
];
const themeBtn = document.getElementById( "themer" );

function toggleTheme () {
    const currentTheme = document.documentElement.getAttribute( 'data-color-scheme' );
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute( 'data-color-scheme', newTheme );
    themeBtn.style.background = newTheme === 'dark' ? "url('./assets/dark.png')" : "url('./assets/light.png')";
}
themeBtn.addEventListener( 'click', toggleTheme );
document.documentElement.setAttribute( 'data-color-scheme', 'light' );