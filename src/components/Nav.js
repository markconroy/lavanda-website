import React from "react";
import { Link, StaticQuery, graphql } from "gatsby";
import "../../static/styles/main.scss";
import logo from "../../static/img/lavanda-logo.svg";

const NavbarBurger = props => (
  <div
    onClick={props.toggleMenu}
    className={`navbar-burger burger ${props.active ? "is-active" : ""}`}
    role="button"
    onKeyDown={props.toggleMenu}
    tabIndex={0}
  >
    <span />
    <span />
    <span />
  </div>
);

class Nav extends React.Component {
  componentDidMount = () => {
    window.addEventListener("scroll", this.handleScroll);
  };

  componentWillUnmount = () => {
    window.removeEventListener("scroll", this.handleScroll);
  };

  handleScroll = () => {
    let position = window.scrollY;
    const nav = document.querySelector("#navbar");
    if (position <= 200) nav.classList.remove("filled");
    else nav.classList.add("filled");
  };

  state = {
    activeMenu: false
  };
  toggleMenu = () => {
    this.setState({
      activeMenu: !this.state.activeMenu
    });
  };

  render() {
    // const featurePages = this.props.data.allMarkdownRemark.edges;
    // const featurePageLinks = featurePages.map(page => (
    //   <li key={page.node.fields.slug}>
    //     <Link to={page.node.fields.slug}>{page.node.frontmatter.title}</Link>
    //   </li>
    // ));

    const { data } = this.props;
    const { edges: featurePages } = data.allMarkdownRemark;

    return (
      <nav
        className={"navbar is-fixed-top"}
        role="navigation"
        aria-label="main navigation"
        id="navbar"
      >
        <div className="container">
          <div className={"navbar-brand"}>
            <Link to="/" className={"navbar-item"}>
              <div className={"logo"}>
                <img alt={"Logo"} src={logo} />
              </div>
            </Link>
            <NavbarBurger
              active={this.state.activeMenu}
              toggleMenu={this.toggleMenu}
            />
          </div>

          <div
            id="lavandaNav"
            className={`navbar-menu ${
              this.state.activeMenu ? "is-active" : ""
            }`}
          >
            <div className={"navbar-end"}>
              {/* Product Section */}

              <div className={"navbar-item has-dropdown is-hoverable"}>
                <Link
                  to="/"
                  className={
                    "navbar-link is-uppercase is-family-secondary has-text-weight-medium"
                  }
                >
                  Product
                </Link>
                <div className={"navbar-dropdown"}>
                  {featurePages &&
                    featurePages.map(({ node: page }) => (
                      <Link
                        key={page.fields.slug}
                        to={page.fields.slug}
                        className={"navbar-item"}
                      >
                        {page.frontmatter.title}
                      </Link>
                    ))}

                  {/* <p className={"heading has-padding-left-10"}>
                    Business Information
                  </p>
                  <Link to="/features/analytics" className={"navbar-item"}>
                    Business Performance Analytics
                  </Link>
                  <Link
                    to="/features/real-time-analytics"
                    className={"navbar-item"}
                  >
                    Real-time Operations Analytics
                  </Link>
                  <p className={"heading has-padding-left-10"}>Growth</p>
                  <Link
                    to="/features/customer-relationship-manager-crm"
                    className={"navbar-item"}
                  >
                    Customer Relationship Manager (CRM)
                  </Link>
                  <p className={"heading has-padding-left-10"}>Distribution</p>
                  <Link
                    to="/features/channel-manager"
                    className={"navbar-item"}
                  >
                    Channel Manager
                  </Link> */}
                </div>
              </div>

              {/*  Solutions section */}

              <div className={"navbar-item has-dropdown is-hoverable"}>
                <Link
                  to="/"
                  className={
                    "navbar-link is-uppercase is-family-secondary has-text-weight-medium"
                  }
                >
                  Solutions
                </Link>
                <div className={"navbar-dropdown"}>
                  <Link to="/for/property-managers" className={"navbar-item"}>
                    For property managers
                  </Link>
                  <Link to="/for/serviced-apartments" className={"navbar-item"}>
                    For serviced apartments
                  </Link>
                  <Link to="/for/residential-assets" className={"navbar-item"}>
                    For residential assets
                  </Link>
                  <Link to="/for/student-housing" className={"navbar-item"}>
                    For student housing
                  </Link>
                  <hr className={"navbar-divider"} />
                  <Link to="/features/developer-api" className={"navbar-item"}>
                    For integration partners
                  </Link>
                </div>
              </div>

              {/* Company Section */}

              <div className={"navbar-item has-dropdown is-hoverable"}>
                <Link
                  to="/"
                  className={
                    "navbar-link is-uppercase is-family-secondary has-text-weight-medium"
                  }
                >
                  Company
                </Link>

                <div className={"navbar-dropdown"}>
                  <Link to="/blog" className={"navbar-item"}>
                    Blog
                  </Link>
                  <Link to="/careers" className={"navbar-item"}>
                    Work at Lavanda
                  </Link>
                  <Link to="/contact" className={"navbar-item"}>
                    Contact
                  </Link>
                  <hr className={"navbar-divider"} />
                  <Link to="/feedback" className={"navbar-item"}>
                    Report an issue
                  </Link>
                </div>
              </div>
            </div>

            <div className={"navbar-end"}>
              <div className={"navbar-item"}>
                <div className={"buttons"}>
                  <Link to="/book-a-demo" className={"button is-primary"}>
                    <strong>Talk to Us</strong>
                  </Link>
                  <Link to="/apps" className={"button is-light"}>
                    Sign In
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
export default () => (
  <StaticQuery
    query={graphql`
      query FeaturePagesLinks {
        allMarkdownRemark(
          filter: { frontmatter: { templateKey: { eq: "feature-page" } } }
          sort: { fields: frontmatter___category }
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                category
                templateKey
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <Nav data={data} count={count} />}
  />
);
