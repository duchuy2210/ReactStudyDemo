import React from 'react';

const CardTailWind = (props) => {
  return (
    <div className="relative w-[400px] h-[450px] ">
      <div className="w-full rounded-lg h-[400px]">
        <img
          className="w-full object-cover h-[400px] block rounded-lg"
          src="https://cdn.dribbble.com/users/2400293/screenshots/16527147/media/f079dc5596a5fb770016c4ea506cd77b.png?compress=1&resize=1000x750&vertical=top"
          alt="hình"
        />
      </div>
      <div className="absolute mx-[25px] bg-white w-[350px] bottom-0 rounded-lg p-5">
        <div className="flex justify-between w-[110px]">
          <img
            className="h-[30px] w-[30px] block object-contain rounded-full"
            src="https://khoinguonsangtao.vn/wp-content/uploads/2022/07/avatar-cute-2.jpg"
            alt="avatar"
          />
          <span className="self-center">@zndrson</span>
        </div>
        <div className="absolute right-5 top-5">
          <span className="text-base font-medium">256</span>
        </div>
        <div className="flex justify-between mt-5">
          <h3 className="font-semibold text-lg">Cosmic Perspective</h3>
          <span className={`font-bold text-lg text-transparent bg-clip-text ${props.primary?"bg-primary-gradient":"bg-secondary-gradient"}`}>
            12,000 PSL
          </span>
        </div>
      </div>
    </div>
  );
};

export default CardTailWind;
