import SocialLinks from "../social-links/SocialLinks";

export default function AboutUs() {
  return (
    <div className="col-span-2 md:col-span-3 lg:col-span-2 lg:pr-8">
      <div className="text-2xl font-bold">Flow Shop</div>
      <p className="mt-7 text-base leading-relaxed text-muted-foreground">
        Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
        sint. Velit officia consequat duis enim velit mollit.
      </p>
      <SocialLinks />
    </div>
  );
}
