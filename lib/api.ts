
export async function fetchServantData() {
    const response = await fetch('https://api.atlasacademy.io/export/JP/nice_servant_lang_en.json');
    const data = await response.json();
    return data;
}
