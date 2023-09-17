export const DBConfig = {
    name: "MiraiDB",
    version: 1,
    objectStoresMeta: [
        {
            store: "playlist",
            storeConfig: { keyPath: "album_id", autoIncrement: false },
            storeSchema: [
                { name: "title", keypath: "title", options: { unique: false } },
                { name: "subtitle", keypath: "subtitle", options: { unique: false } },
                { name: "src", keypath: "src", options: { unique: false } },
                { name: "code", keypath: "code", options: { unique: false } },
                { name: "album_id", keypath: "album_id", options: { unique: true } },
                { name: "timestamp", keypath: "timestamp", options: { unique: false } },
                { name: "cover", keypath: "cover", options: { unique: false } },
                { name: "artist", keypath: "artist", options: { unique: false } },
                { name: "lyric", keypath: "lyric", options: { unique: false } },
            ],
        },
    ],
};