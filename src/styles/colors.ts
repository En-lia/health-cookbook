export const COLORS: { [key: string]: string } = {
    'transparent': 'transparent',
    'white': '#ffffff',
    'gray-ultra-light': '#f2f3ff',
    'gray-light': '#fafafa',
    'gray': '#d9d9d9',
    'gray-deep': '#74777d',
    'black': '#000000',
    'indigo-ultra-light': '#aeb2dc',
    'indigo-light': '#66629c',
    'indigo': '#453c74',
    'indigo-deep': '#071143',
    'purple': '#a044ff',
    'lightpurple': '#f2e6ff',
    'lightpink': '#fee2ee',
    'pink': '#fd6f97',
    'deeppink': '#c92780',
    'yellow': '#fbd72e',
    'lightyellow': '#fde9cb',
    'beige': '#dfdad8',
    'lightgreen': '#def4ec',
    'lime': '#32d987',
    'green-light': '#9b9d78',
    'green': '#4e5b02',
    'green-deep': '#242a00',
    'steelblue': '#5b7ee5',
};

const colorsString = Object.entries(COLORS).map(([key, value]) => (`--${key}: ${value}`)).join(';');

export const createColorStyle = () => {
    const el = document.createElement('style');
    el.innerHTML = `:root {${colorsString}}`;
    document.querySelector('head').append(el);
};

export const antdTheme = { token: { colorPrimary: COLORS['green-light'] } };
