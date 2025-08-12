import { gsap, SplitText } from 'gsap';

gsap.registerPlugin(SplitText) 

// split elements with the class "split" into words and characters
export const split = SplitText.create(".split", { type: "words, chars" });