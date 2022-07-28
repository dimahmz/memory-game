import { createStore } from 'vuex'
const store=createStore({
 state:{
  IMAGES:[]
 },
 mutations:{
  ADD_IMAGES(state,imgs_array){
   state.IMAGES=imgs_array
   console.log(state.IMAGES)
  },
  FLIP_UP_IMAGE(state,index){
   state.IMAGES[index].flip=true
   console.log(state.IMAGES)

  }
 },
 getters:{
  get_images(state){
   return state.IMAGES
  }
 },
 actions:{
  async fetch_images({commit}){
   try{
    const Cards_object = await fetch('Data/data.json')
    const Cards = await Cards_object.json()
    commit('ADD_IMAGES',Cards.IMAGES)
   }
   catch(error){
    console.log(error)
  }
 },
}
})

export default store