import React from 'react'

import { useEffect, useState } from 'react';
import styled from "styled-components";



const CardDiv=styled.div`
    margin-left:130px;
    transition: transform 0.5s ease-in-out;
    display:flex;
    gap:10px;
    position:absolute;
   
    margin-top:120px;
    top:400px;
    // overflow-x:hidden;
    
   

   
    

`;

const ImageContainer = styled.div`

background-color:red;

width :150px;
height:200px;
 
  &:hover {
    transform: scale(1.8);
    // width:300px;
    // height:150px;
    img{
      height:100px;
  }
  
  
`;

const Overlay = styled.div`
  margin-left:7px;
  position: relative;
  top:5px;
  bottom: 0px;
  
  height:auto;
  width: auto;
  // background-color: rgba(0, 0, 0, 0.5); /* semi-transparent background */
  // padding: 0px ;
`;

const Button = styled.button`
  width:100px;
  height:25px;
  background-color: green;
  color: #333;
  border: none;
  // padding: 5px 8px;
  cursor: pointer;
  border-radius: 5px;
`;

const Text = styled.p`
  color: #fff;
  margin: 0;
  padding: 5px 2px;
  font-size:8px;
  
`;

const SmallButton = styled.button`
border-radius: 5px;
  height:25px;
  width:30px;
  background-color: lightblue;
  color: #333;
  border: none;
  // padding: 4px 5px;  /* Adjust padding as needed */
  margin-left:5px;
  cursor: pointer;
`;
 const SmallText=styled.p`
  
 padding-top:5px;

  font-weight:bold;
  font-size:8px;
  text-align: justify;
 
 `;
 

 
function MovieList() {
 
    const [imageUrls, setImageUrls] = useState([]);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [visibleImages, setVisibleImages] = useState(7);
  
    const getData = async () => {
      try {
        const resp = await fetch('https://api.sampleapis.com/movies/family');
        const movies = await resp.json();
        
        // Extract image URLs from movie data
        const urls = movies.map(movie => movie.posterURL);
        
        setImageUrls(urls);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    useEffect(() => {
      getData();
    }, []);

    const handleScrollButtonClick = () => {
      setVisibleImages(prev => prev + 5);
    };
  
  return (

<>


<CardDiv>

  
{imageUrls.slice(0, visibleImages).map((url, index) => (
  <ImageContainer   key={index}
  onMouseEnter={() => setHoveredIndex(index)}
  onMouseLeave={() => setHoveredIndex(null)}>
        <img key={index} src={url} alt={`Movie Poster ${index}`} height="200px" width="150px" />

        {hoveredIndex === index && (
            <Overlay>
              <Button>Click me</Button>
              <SmallButton>+</SmallButton>

              <SmallText>2024-2h.12m-Hindi-U/A16+</SmallText>
             
              <Text>From carefree college days to becoming a successful wedding
photographer, this coming-of-age story depicts the colours of
Arun Neelakandan's exciting life.</Text>
            </Overlay>
          )}
        

        

        </ImageContainer>
      ))}

{visibleImages < imageUrls.length && (
        <Button onClick={handleScrollButtonClick}>Scroll for more</Button>
      )}
    
</CardDiv>
</>
)
}

 
export default MovieList;
 