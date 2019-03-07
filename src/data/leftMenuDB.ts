export const leftItems: any = [
  {
    id:1,
    title: "Home",
    subitems:[],
    isSelected:false
  },
  {
    id:2,
    title:"Browse",
    subitems:[],
    isSelected:false
  },
  {
    id:3,
    title:"Library",
    // subitems:["Your Songs", "Artists", "Albums"],
    subitems:[{id:1,title:"Your Songs"}, {id:2, title:"Artists"}, {id:3,title:"Albums"}],
    isSelected:false
  },
  {
    id:4,
    title:"Playlists",
    subitems:[{id:1, title:"Your Playlists"}, {id:2, title:"Friends Playlists"}],
    isSelected:false
  }
]
