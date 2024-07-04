import React from "react";

function AboutPage() {
  return (
    <div>
      <h1>About Us</h1>
      return (
      <Layout>
        <div
          style={{
            scrollSnapType: "y mandatory",
            overflowY: "scroll",
            height: "100vh",
          }}
        >
          <div style={{ scrollSnapAlign: "start" }}>
            <h1>Home Page</h1>
            <DarkGridHero />
          </div>

          <div style={{ scrollSnapAlign: "start" }}>
            <section style={{ height: "100vh", backgroundColor: "#f0f0f0" }}>
              <div style={{ padding: "20px" }}>
                <h2>Section 1</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  ac bibendum magna. Sed in felis ac nisi pretium consequat vel
                  ac nisi. Morbi at nisi et urna pulvinar sollicitudin.
                  Vestibulum elementum augue ut est fermentum, nec vestibulum
                  lectus pellentesque.
                </p>
                <p>
                  Proin non sapien nec ex gravida interdum ut non orci. Fusce id
                  eros a lorem vestibulum lacinia vel id enim. Morbi vel
                  ultricies libero. Nam efficitur a ex non auctor. Sed
                  vestibulum diam eu magna posuere, non lacinia sapien maximus.
                  Vestibulum scelerisque sit amet orci sit amet malesuada.
                </p>
              </div>
            </section>
          </div>

          <div style={{ scrollSnapAlign: "start" }}>
            <section style={{ height: "100vh", backgroundColor: "#e0e0e0" }}>
              <div style={{ padding: "20px" }}>
                <h2>Section 2</h2>
                <p>
                  Duis tempus libero eget magna luctus, eu placerat sapien
                  efficitur. Proin id enim id libero accumsan sollicitudin nec
                  in orci. Nullam gravida dui eget ex pellentesque, non mattis
                  ligula aliquam. Donec sed sapien ipsum. Aliquam condimentum
                  metus eu nisi auctor, nec interdum arcu pulvinar.
                </p>
                <p>
                  Curabitur tincidunt metus id sem ultricies, at auctor ligula
                  lacinia. Proin posuere urna sit amet enim ultricies, sed
                  efficitur libero scelerisque. Nullam vehicula eros non elit
                  congue, vitae interdum magna ultricies. Nam venenatis diam id
                  justo maximus, ac bibendum risus pretium.
                </p>
              </div>
            </section>
          </div>

          <div style={{ scrollSnapAlign: "start" }}>
            <section style={{ height: "100vh", backgroundColor: "#d0d0d0" }}>
              <div style={{ padding: "20px" }}>
                <h2>Section 3</h2>
                <p>
                  Vestibulum lacinia, elit nec condimentum varius, leo mauris
                  efficitur urna, in pharetra metus tortor sed ex. In hac
                  habitasse platea dictumst. Proin rutrum consequat malesuada.
                  Fusce sodales quam in felis volutpat, sit amet interdum neque
                  condimentum.
                </p>
                <p>
                  Morbi vehicula felis et purus fermentum congue. Praesent
                  semper magna sit amet commodo lobortis. Cras pellentesque
                  lacus a justo ultricies, at ullamcorper arcu ultricies.
                  Integer nec sagittis risus, eu efficitur est.
                </p>
              </div>
            </section>
          </div>
        </div>
      </Layout>
      );
      {/* Your about page content */}
    </div>
  );
}

export default AboutPage;
