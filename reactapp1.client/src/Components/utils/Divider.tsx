interface Props {
  margin?: string;
  border?: string;
  padding?: string;
}

function Divider({ margin, border, padding }: Props) {
  const styles = {
    margin,
    padding,
    border,
  };
  return (
    <>
      <hr style={styles} />
    </>
  );
}

export default Divider;
