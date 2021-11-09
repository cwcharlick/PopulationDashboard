export const ToolTip = (props) => {
    return <div className="tooltip" style={{position: "absolute", left: props.left - 280, top: props.top + 20}}><h2>{props.title}</h2>{props.children}</div>
}