type Props = {
  lightMode?: boolean;
};

const Footer = ({ lightMode }: Props) => {
  return (
    <footer
      style={{ borderTopColor: lightMode ? "#ffffff66" : undefined }}
      className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs"
    >
      <p style={{ color: lightMode ? "#ffffffCC" : undefined }}>
        Powered by{" "}
        <a
          href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
          target="_blank"
          className="font-bold hover:underline"
          rel="noreferrer"
        >
          SenaRego
        </a>
      </p>
    </footer>
  );
};

export default Footer;
