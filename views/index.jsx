var React = require('react');

class Index extends React.Component {
  render () {
    return (
      <html>
        <head>
          <meta charSet='utf-8'/>
          <meta httpEquiv='x-ua-compatible' content='ie=edge'/>
          <title>Server-Rendering</title>
          <meta name='description' content='Server-Rendering'/>
          <meta name='viewport' content='width=device-width, initial-scale=1'/>
          {
            this.props.styles.map((style) => {
              return <link href={style} rel='stylesheet'/>;
            })
          }
          <script dangerouslySetInnerHTML={{__html: `
            window.__REDUX_STATE__ = '${this.props.state}'
          `}} />
        </head>
        <body>
          <div id='root' dangerouslySetInnerHTML={{__html: this.props.content}}>
          </div>
          {
            this.props.scripts.map((script) => {
              return <script src={script}/>;
            })
          }
        </body>
      </html>
    );
  }
}

Index.propTypes = {
  scripts: React.PropTypes.array,
  styles: React.PropTypes.array,
  content: React.PropTypes.string,
  state: React.PropTypes.string
};

module.exports = Index;
