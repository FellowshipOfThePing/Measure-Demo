import React from "react";
import classNames from "classnames";

const layoutClassName = "react-grid-layout";

export default function CustomWidthProvider(ComposedComponent) {
  return class WidthProvider extends React.Component {
    state = {
      width: 1280,
    };

    elementRef = React.createRef();
    mounted = false;

    componentDidMount() {
      this.mounted = true;
      window.addEventListener("resize", this.onWindowResize);
      this.onWindowResize();
    }

    componentDidUpdate(prevProps) {
      if (this.props.gridWidth !== prevProps.gridWidth) {
        this.onWindowResize();
      }
    }

    componentWillUnmount() {
      this.mounted = false;
      window.removeEventListener("resize", this.onWindowResize);
    }

    onWindowResize = () => {
      if (!this.mounted) return;
      const node = this.elementRef.current;
      if (node instanceof HTMLElement && node.offsetWidth) {
        this.setState({ width: node.offsetWidth });
      }
    };

    render() {
      const { measureBeforeMount, ...rest } = this.props;
      if (measureBeforeMount && !this.mounted) {
        return (
          <div
            className={classNames(this.props.className, layoutClassName)}
            style={this.props.style}
            ref={this.elementRef}
          />
        );
      }

      return (
        <ComposedComponent
          innerRef={this.elementRef}
          {...rest}
          {...this.state}
        />
      );
    }
  };
}
