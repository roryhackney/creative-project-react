import React from "react";

const About = () => {
    document.title = "About | Art Supply Tracker";
    return (
        <main id="main-page">
            <h2><span>About</span>the Art Supply Tracker!</h2>
            <p>Are your closets <strong>filled</strong> with art supplies? Are your pen holders overflowing? Did you just <em>buy art supplies</em> and then <span>realize you already had them at home</span>?</p>
            <p>(It's fine, you deserve a little treat.)</p>
            <div className="star">
                <p>Introducing the Art Supply Tracker, the perfect system for tracking your collection!</p>
            </div>
            <p><em>Effortlessly</em> find where you put your favorite pen, which brushes you do or don't have, what <span>color</span> of paint you've <strong>already bought</strong> three times.</p>
            <p>Organize by <span>color</span>, <em>quality</em>, or <strong>custom properties</strong>. If the system doesn't have your favorite supply, <span>add a new category</span>!</p>
            <p>Unsure at the art store? Just pull the Tracker up on your phone and find out <em>what <span>you're <strong>missing</strong>!</span></em></p>
            <p>Or better yet, <span>send your Wishlist</span> to all your friends...</p>
            <p>What are you waiting for? <strong><a href="/register">Register</a> today!</strong></p>
        </main>
    );
}

export default About;