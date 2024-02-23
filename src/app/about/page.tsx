export default function About() {
    return (
      <div className="bg-cover bg-center min-h-75 h-auto w-full py-2 px-10 md:px-30 flex flex-wrap justify-start items-center">
        <div className="max-w-800 flex flex-col items-center py-10 px-10 md:py-40 md:px-40 bg-red-100 rounded-lg ">
          <p className="text-2xl md:font-extrabold font-bold leading-14 md:text-3xl md:leading-11 text-center mb-12">About Us</p>
          <p className="text-xl leading-8 md:text-center text-start mb-24 md:text-base md:leading-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu</p>
          <div className="flex justify-center">
            <a className="mr-5 hover:cursor-pointer">
              <img
                className="w-6 h-6 md:w-8 md:h-8"
                src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/bb33.png"
              />
            </a>
            <a className="mr-5 hover:cursor-pointer">
              <img
                className="w-6 h-6 md:w-8 md:h-8"
                src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/bb34.png"
              />
            </a>
            <a className="mr-5 hover:cursor-pointer">
              <img
                className="w-6 h-6 md:w-8 md:h-8"
                src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/bb35.png"
              />
            </a>
            <a className="hover:cursor-pointer">
              <img
                className="w-6 h-6 md:w-8 md:h-8"
                src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/bb36.png"
              />
            </a>
          </div>
        </div>
      </div>
    );
  }
  