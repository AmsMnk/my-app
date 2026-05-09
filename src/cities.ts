export type City = {
    name: string       // 表示用の日本語名
    reading: string    // ひらがな読み
    query: string      // API検索用（ローマ字）
}

export const cities: City[] = [
    { name: '札幌', reading: 'さっぽろ', query: 'Sapporo' },
    { name: '仙台', reading: 'せんだい', query: 'Sendai' },
    { name: '東京', reading: 'とうきょう', query: 'Tokyo' },
    { name: '横浜', reading: 'よこはま', query: 'Yokohama' },
    { name: '名古屋', reading: 'なごや', query: 'Nagoya' },
    { name: '京都', reading: 'きょうと', query: 'Kyoto' },
    { name: '大阪', reading: 'おおさか', query: 'Osaka' },
    { name: '神戸', reading: 'こうべ', query: 'Kobe' },
    { name: '広島', reading: 'ひろしま', query: 'Hiroshima' },
    { name: '福岡', reading: 'ふくおか', query: 'Fukuoka' },
    { name: '那覇', reading: 'なは', query: 'Naha' },
]