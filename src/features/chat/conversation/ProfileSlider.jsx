import Slider from "react-slick";
/*React Slick Slider css*/
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function ProfileSlider() {
  const settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    // autoplay: true,
    autoplaySpeed: 2000,
  };
  return (
    <div className="slider-container">
      <Slider ref={(slider) => slider} {...settings}>
        <div className="relative min-h-[100px]">
          <img
            className="w-full max-h-[100px] h-full rounded-2xl object-cover absolute left-0 top-0 z-0"
            src="https://images.unsplash.com/photo-1453396450673-3fe83d2db2c4?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFuJTIwd2VtZW58ZW58MHx8MHx8fDA%3D"
            alt=""
          />
          <div className="absolute bottom-[15px] right-[15px] w-[6px] h-[6px] rounded-[50%] bg-green-600"></div>
          <p className="text-[10px] text-white absolute bottom-[10px] font-medium left-[5px]">Monir hossain</p>
        </div>
        <div className="relative min-h-[100px]">
          <img
            className="w-full max-h-[100px] h-full rounded-2xl object-cover absolute left-0 top-0 z-0"
            src="https://images.unsplash.com/photo-1527010154944-f2241763d806?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDExfHx8ZW58MHx8fHx8"
            alt=""
          />
          <div className="absolute bottom-[15px] right-[15px] w-[6px] h-[6px] rounded-[50%] bg-amber-500"></div>
          <p className="text-[10px] text-white absolute bottom-[10px] font-medium left-[5px]">Monir hossain</p>
        </div>
        <div className="relative min-h-[100px]">
          <img
            className="w-full max-h-[100px] h-full rounded-2xl object-cover absolute left-0 top-0 z-0"
            src="https://images.unsplash.com/photo-1619947665093-b8018e3dd1a9?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDQ2fHx8ZW58MHx8fHx8"
            alt=""
          />
          <div className="absolute bottom-[15px] right-[15px] w-[6px] h-[6px] rounded-[50%] bg-amber-500"></div>
          <p className="text-[10px] text-white absolute bottom-[10px] font-medium left-[5px]">Monir hossain</p>
        </div>
        <div className="relative min-h-[100px]">
          <img
            className="w-full max-h-[100px] h-full rounded-2xl object-cover absolute left-0 top-0 z-0"
            src="https://images.unsplash.com/photo-1584940120743-8981ca35b012?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDY0fHx8ZW58MHx8fHx8"
            alt=""
          />
          <div className="absolute bottom-[15px] right-[15px] w-[6px] h-[6px] rounded-[50%] bg-green-600"></div>
          <p className="text-[10px] text-white absolute bottom-[10px] font-medium left-[5px]">Monir hossain</p>
        </div>
        <div className="relative min-h-[100px]">
          <img
            className="w-full max-h-[100px] h-full rounded-2xl object-cover absolute left-0 top-0 z-0"
            src="https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDc1fHx8ZW58MHx8fHx8"
            alt=""
          />
          <div className="absolute bottom-[15px] right-[15px] w-[6px] h-[6px] rounded-[50%] bg-amber-500"></div>
          <p className="text-[10px] text-white absolute bottom-[10px] font-medium left-[5px]">Monir hossain</p>
        </div>
      </Slider>
    </div>
  );
}
export default ProfileSlider;
