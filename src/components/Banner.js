const Banner = ({ nomination }) => {
  return nomination.length >= 5 ? (
    <div>
      <p>You have nominated {nomination.length} movies</p>
    </div>
  ) : null;
};

export default Banner;
