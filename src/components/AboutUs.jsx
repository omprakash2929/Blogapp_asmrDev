import React from 'react'

const AboutUs = () => {
  return (
   <div>
  <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20">
    <div className="max-w-6xl mx-auto px-6 text-center">
      <h1 className="text-4xl md:text-6xl font-bold">About ASMRDev</h1>
      <p className="mt-4 text-lg md:text-xl">
        Simplifying technology to inspire and empower developers worldwide.
      </p>
    </div>
  </section>
  {/* Mission Statement */}
  <section className="py-16 bg-white">
    <div className="max-w-5xl mx-auto px-6">
      <h2 className="text-3xl md:text-4xl font-semibold text-center text-gray-800">Our Mission</h2>
      <p className="mt-6 text-lg text-gray-600 text-center">
        At ASMRDev, our mission is to break down complex tech concepts into simple, actionable insights. 
        We aim to create a space where developers of all levels can learn, grow, and thrive in the tech world.
      </p>
    </div>
  </section>
 <section className="w-screen bg-white py-10 text-gray-800">
  <div className="container mx-auto w-full max-w-screen-xl">
    <div className="flex flex-col lg:flex-row">
      <div className="w-full p-4 text-left lg:w-1/3">
        <hr className="mb-4 h-1.5 w-1/4 bg-blue-600" />
        <h3 className="font-sans text-4xl font-light leading-10">INNOVATE.</h3>
        <p className="my-5 text-gray-600"> Distinctio assumenda tenetur sequi, nemo, error illum dolorem dolor voluptatum beatae dignissimos nulla dolores delectus similique blanditiis praesentium deserunt?</p>
      </div>
      <div className="w-full p-4 text-left lg:w-1/3">
        <hr className="mb-4 h-1.5 w-1/4 bg-blue-600" />
        <h3 className="font-sans text-4xl font-light leading-10">GROW.</h3>
        <p className="my-5 text-gray-600">Deleniti earum nulla repudiandae esse delectus. Dolorem, hic animi sit pariatur ducimus commodi tempore.</p>
      </div>
      <div className="w-full p-4 text-left lg:w-1/3">
        <hr className="mb-4 h-1.5 w-1/4 bg-blue-600" />
        <h3 className="font-sans text-4xl font-light leading-10">SERVE.</h3>
        <p className="my-5 text-gray-600">Lorem ipsum dolor, situos unde voluptatibus corrupti similique aperiam. Molestias corporis numquam quos dolorem culpa ullam ad. Ipsa quidem excepturi mollitia? Expedita, sequi?</p>
      </div>
    </div>
  </div>
</section>


<div>
  {/* About Me Section */}
  <section className="py-16 bg-gray-50">
    <div className="max-w-4xl mx-auto px-6">
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-3xl font-semibold text-gray-800">Who I Am</h2>
          <p className="mt-4 text-lg text-gray-600">
            I’m a solo developer and tech enthusiast with a love for coding, creating, and teaching. Through ASMRDev, I aim to inspire and support developers by sharing practical knowledge and real-world coding tips.
          </p>
        </div>
        <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
          <img className="w-48 h-48 rounded-full shadow-lg object-cover " src="https://images.unsplash.com/photo-1481437642641-2f0ae875f836?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D" alt="Your Photo" />
        </div>
      </div>
    </div>
  </section>
  {/* Call to Action */}
  <section className="bg-blue-500 text-white py-16">
    <div className="max-w-4xl mx-auto px-6 text-center">
      <h2 className="text-3xl md:text-4xl font-bold">Join My Journey</h2>
      <p className="mt-4 text-lg">
        Let’s learn, build, and grow together. Explore tutorials, follow projects, or get in touch for collaboration!
      </p>
      <a href="/contact" className="mt-6 inline-block bg-white text-blue-500 font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-gray-100">
        Contact Me
      </a>
    </div>
  </section>
</div>

</div>

  )
}

export default AboutUs