import exp from "constants";

export async function fetchServantData() {
    const response = await fetch('https://api.atlasacademy.io/export/JP/nice_servant_lang_en.json');
    const data = await response.json();
    return data;
}

export async function fetchCraftEssencesData() {
    const response = await fetch('https://api.atlasacademy.io/export/JP/nice_equip_lang_en.json');
    const data = await response.json();
    return data;
}

export async function fetchMaterialData() {
    const response = await fetch('https://api.atlasacademy.io/export/JP/nice_item_lang_en.json');
    const data = await response.json();
    return data;
}

export async function fetchStoryData() {
    const response = await fetch('https://api.atlasacademy.io/export/NA/nice_war.json');
    const data = await response.json();
    return data;
}

export async function fetchEventData() {
    const response = await fetch('https://api.atlasacademy.io/export/JP/nice_war_lang_en.json');
    const data = await response.json();
    return data;
}

export async function fetchStoryEventDetails(id: number) {
    const response = await fetch(`https://api.atlasacademy.io/nice/JP/war/${id}?lang=en`);
    const data = await response.json();
    return data;
}


