import { Link } from 'react-router-dom'

function Button(props) {
    return (
        <button className="button">
            <Link 
                to={ props.link }
                >
                <span>{ props.linkText }</span>
            </Link>
        </button>
    );
  }

  export default Button;
