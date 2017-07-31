// Get's the route for a component
const getRouteComponent = (fractal) => {
    const route = fractal.web._themes.get('default')._routes.get('component');

    return route.path;
};

module.exports = (fractal) => {
    let routeComponent;

    // This get's called for every `{{ componentPath '@handle' }}`
    return (handle) => {
        // Check whether given handle is indeed a handle
        if (typeof handle !== 'string' || !handle.match(/^@/)) {
            return handle;
        }

        // Get rid of the handle prefix
        const path = handle.substr(1);

        // Memoize the route for components
        if (!routeComponent) {
            routeComponent = getRouteComponent(fractal);
        }

        // console.info(routeComponent);
        // console.log(path);
        // console.log(fractal);
        // console.log(fractal._config.web.builder);

        // Return the HTTP path to the component
        let retval = `${routeComponent.replace(':handle', path)}`;//+fractal._config.web.builder.ext;
        if (fractal._config.env === 'production') {
            retval += fractal._config.web.builder.ext;
        }
        // console.log(retval);
        return retval;
        // return `${routeComponent.replace(':handle', path)}${fractal._config.web.builder.ext}`;
    };
};
