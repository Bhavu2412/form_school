export default function About() {
  return (
    <>
      <div className="flex flex-col items-center justify-center w-screen space-y-10 mt-8">
        <div className="flex flex-col items-center justify-center">
          <h5 className="text-blue-400 font-Link">
            Know Everything... About Us
          </h5>
          <h1 className="font-hTags text-center">About FormsPro</h1>
        </div>
        <p className="w-[90vw] md:w-[71vw] text-md font-General text-center">
          Welcome to FormPro, your ultimate destination for intuitive and
          powerful form creation. At FormPro, we are dedicated to simplifying
          the way you collect, manage, and analyze data. Our mission is to
          provide you with easy-to-use tools that enable you to build dynamic
          forms effortlessly, whether for personal, professional, or
          organizational use.
        </p>
      </div>
      <div className="flex flex-col items-center space-y-5 justify-center m-8 p-2 w-[90vw] md:w-[70vw] rounded-lg">
        <img
          className="rounded-xl"
          src="https://media.istockphoto.com/id/1368965646/photo/multi-ethnic-guys-and-girls-taking-selfie-outdoors-with-backlight-happy-life-style-friendship.jpg?s=612x612&w=0&k=20&c=qYST1TAGoQGV_QnB_vMd4E8jdaQUUo95Sa2JaKSl_-4="
          alt="Multi-ethnic guys and girls taking a selfie outdoors"
        />
        <p className="text-3xl md:text-5xl font-Cursive text-center">
          Screenshot from FormPro, June 2024
        </p>
      </div>
    </>
  );
}
