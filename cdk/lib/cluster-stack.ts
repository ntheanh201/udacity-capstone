import * as cdk from 'aws-cdk-lib';
import * as eks from 'aws-cdk-lib/aws-eks';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as iam from 'aws-cdk-lib/aws-iam';
import { KubectlV27Layer } from '@aws-cdk/lambda-layer-kubectl-v27';

import { Construct } from 'constructs';

export class EksClusterStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create a VPC for the EKS cluster
    const vpc = new ec2.Vpc(this, 'MyVpc', {
      maxAzs: 3 // Specify the number of Availability Zones you want to use
    });

    // Create an IAM role for the EKS cluster
    const clusterAdmin = new iam.Role(this, 'ClusterAdminRole', {
      assumedBy: new iam.AccountRootPrincipal()
    });

    // Create the EKS cluster
    const eksCluster = new eks.Cluster(this, 'MyEksCluster', {
      version: eks.KubernetesVersion.V1_27,
      defaultCapacity: 2, // Specify the desired number of worker nodes
      mastersRole: clusterAdmin,
      vpc,
      clusterName: `${id}`,
      kubectlLayer: new KubectlV27Layer(this, 'KubectlLayer')
    });

    // Add additional EKS configuration as needed (e.g., add-ons, nodegroups)

    // Output the EKS cluster name and ARN
    new cdk.CfnOutput(this, 'EksClusterName', {
      value: eksCluster.clusterName
    });
    new cdk.CfnOutput(this, 'EksClusterArn', {
      value: eksCluster.clusterArn
    });
  }
}