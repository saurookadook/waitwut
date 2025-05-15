import React from 'react';

/**
import * as React from 'react';

function AwsIconEl(
    props: React.HTMLAttributes<SVGSVGElement>, // force formatting
    ref: React.Ref<SVGSVGElement>
) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" {...props} ref={ref}>

        </svg>
    )
}

export const AwsIcon = React.forwardRef(AwsIconEl);
 *
*/

/**
 * Icon SVGs from devicon:
 * - https://github.com/devicons/devicon/tree/master/icons
 */
import { AwsIcon } from './AwsIcon';
import { AwsWordmarkIcon } from './AwsWordmarkIcon';
import { D3JSIcon } from './D3JSIcon';
import { DockerIcon } from './DockerIcon';
import { DockerWordmarkIcon } from './DockerWordmarkIcon';
import { JavaIcon } from './JavaIcon';
import { JavaWordmarkIcon } from './JavaWordmarkIcon';
import { JavaScriptIcon } from './JavaScriptIcon';
import { JestIcon } from './JestIcon';
import { KnexJSWordmarkIcon } from './KnexJSWordmarkIcon';
import { LinuxIcon } from './LinuxIcon';
import { MongoDBIcon } from './MongoDBIcon';
import { MongoDBWordmarkIcon } from './MongoDBWordmarkIcon';
import { NestJSIcon } from './NestJSIcon';
import { NestJSWordmarkIcon } from './NestJSWordmarkIcon';
import { NetlifyIcon } from './NetlifyIcon';
import { NetlifyWordmarkIcon } from './NetlifyWordmarkIcon';
import { NodeJSIcon } from './NodeJSIcon';
import { PnpmIcon } from './PnpmIcon';
import { PnpmWordmarkIcon } from './PnpmWordmarkIcon';
import { PoetryIcon } from './PoetryIcon';
import { PostgreSQLIcon } from './PostgreSQLIcon';
import { PostgreSQLWordmarkIcon } from './PostgreSQLWordmarkIcon';
import { PyPiIcon } from './PyPiIcon';
import { PyPiWordmarkIcon } from './PyPiWordmarkIcon';
import { PytestIcon } from './PytestIcon';
import { PytestWordmarkIcon } from './PytestWordmarkIcon';
import { PythonIcon } from './PythonIcon';
import { ReactIcon } from './ReactIcon';
import { ReactWordmarkIcon } from './ReactWordmarkIcon';
import { ReactRouterIcon } from './ReactRouterIcon';
import { ReactRouterWordmarkIcon } from './ReactRouterWordmarkIcon';
import { RubyIcon } from './RubyIcon';
import { RubyWordmarkIcon } from './RubyWordmarkIcon';
import { SQLAlchemyIcon } from './SQLAlchemyIcon';
import { SQLAlchemyWordmarkIcon } from './SQLAlchemyWordmarkIcon';
import { TypeScriptIcon } from './TypeScriptIcon';
import { ViteJSIcon } from './ViteJSIcon';
import { VSCodeIcon } from './VSCodeIcon';
import { VSCodeWordmarkIcon } from './VSCodeWordmarkIcon';
import { VueJSIcon } from './VueJSIcon';
import { VueJSWordmarkIcon } from './VueJSWordmarkIcon';

const icons: IconComponents = {
    aws_icon: AwsIcon,
    aws_wordmark_icon: AwsWordmarkIcon,
    d3js_icon: D3JSIcon,
    docker_icon: DockerIcon,
    docker_wordmark_icon: DockerWordmarkIcon,
    java_icon: JavaIcon,
    java_wordmark_icon: JavaWordmarkIcon,
    javascript_icon: JavaScriptIcon,
    jest_icon: JestIcon,
    knex_js_wordmark_icon: KnexJSWordmarkIcon,
    linux_icon: LinuxIcon,
    mongodb_icon: MongoDBIcon,
    mongodb_wordmark_icon: MongoDBWordmarkIcon,
    nestjs_icon: NestJSIcon,
    nestjs_wordmark_icon: NestJSWordmarkIcon,
    netlify_icon: NetlifyIcon,
    netlify_wordmark_icon: NetlifyWordmarkIcon,
    nodejs_icon: NodeJSIcon,
    pnpm_icon: PnpmIcon,
    pnpm_wordmark_icon: PnpmWordmarkIcon,
    poetry_icon: PoetryIcon,
    postgresql_icon: PostgreSQLIcon,
    postgresql_wordmark_icon: PostgreSQLWordmarkIcon,
    pypi_icon: PyPiIcon,
    pypi_wordmark_icon: PyPiWordmarkIcon,
    pytest_icon: PytestIcon,
    pytest_wordmark_icon: PytestWordmarkIcon,
    python_icon: PythonIcon,
    react_icon: ReactIcon,
    react_wordmark_icon: ReactWordmarkIcon,
    react_router_icon: ReactRouterIcon,
    react_router_wordmark_icon: ReactRouterWordmarkIcon,
    ruby_icon: RubyIcon,
    ruby_wordmark_icon: RubyWordmarkIcon,
    sqlalchemy_icon: SQLAlchemyIcon,
    sqlalchemy_wordmark_icon: SQLAlchemyWordmarkIcon,
    typescript_icon: TypeScriptIcon,
    vitejs_icon: ViteJSIcon,
    vscode_icon: VSCodeIcon,
    vscode_wordmark_icon: VSCodeWordmarkIcon,
    vuejs_icon: VueJSIcon,
    vuejs_wordmark_icon: VueJSWordmarkIcon,
};

export default icons;
