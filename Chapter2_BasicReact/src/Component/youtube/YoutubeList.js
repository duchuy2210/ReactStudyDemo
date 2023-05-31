import React from 'react';
import data from './DataYoutube'
import VidItem from './VidItems';
const YoutubeList = (props) => {
  return (
      <div className="youtube-list">
      {
        data.map((item,index)=>{
          return (
            <VidItem
              key={index}
              //nếu không có ảnh thì sẽ set ảnh default
              src={item.src || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-5j-n4J8qMmdEDWefbvEfy6cATZ9QX6_713N8NJDDaA&s"}
              name={item.name}
              className={index === 1 ? "abc" :" "}
              description={props.children}>
            </VidItem>
          )
        })
      }
    </div>
  );
};
export default YoutubeList

