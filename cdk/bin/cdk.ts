#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkStack } from '../lib/cdk-stack';
import { EksClusterStack } from '../lib/cluster-stack';

const app = new cdk.App();
new EksClusterStack(app, 'EksClusterStack');
