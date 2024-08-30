
import React from "react";

// reactstrap components
import { Container} from "reactstrap";

function Footer() {
  return (
    <footer className="footer">
      <Container fluid>
        <div className="copyright">
          © {new Date().getFullYear()} --
          ByteSoft.
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
