---
title: 'Linux Networking, From First Principles'
summary: 'A four-lesson Linux networking course: start with isolated hosts, connect them, build a switched LAN, and route between subnets.'
date: '2026-10-16'
topic: Networking
category: Guides
tags:
  - Linux
  - Network namespaces
  - Veth
  - Bridges
  - ARP
  - Routing
published: true
---

**Understand the objects. Compare the architectures. Build the network. Explain the packets.**

This is a four-lesson course and a practical reference for someone who can use a Linux terminal but has not yet formed a clear picture of networking. You do not need to have read another document or completed an earlier lab.

We will eventually build three hosts named `host1`, `host2`, and `host3`, connected to the Linux bridge `br1` inside the namespace `bridge1`. But first we will learn what each of those words means. Afterwards, we will add a router and a fourth host to discover what changes when traffic crosses into another IP subnet.

The main examples use **IPv4 over Ethernet**. Advanced features such as VLAN filtering, policy routing, proxy ARP, overlays, and NAT are not enabled in the lab. When a statement depends on that simple setup, the surrounding explanation says so.

## The four lessons

1. [Interfaces, namespaces, and loopback](/notes/linux-networking-isolated-hosts/)
2. [Connecting two hosts](/notes/linux-networking-direct-connections/)
3. [Building a switched LAN](/notes/linux-networking-switched-lan/)
4. [Routing between subnets](/notes/linux-networking-routing-between-subnets/)

Each lesson combines the concepts, topology, guided exercise, and review questions for one lab stage. Follow the lessons in order on your first visit; use the contents list within each lesson when returning to a particular concept.

## Prerequisites

You should be comfortable using a Linux terminal. Use a Linux machine or Linux VM where you can run `sudo` and create network namespaces and virtual devices. A restricted container may prevent these operations.

The tools are `ip`, `bridge`, `ping`, `tcpdump`, `sysctl`, `lsns`, Python 3, and `curl`. Lesson 1 includes installation and environment checks. No Internet access is needed for the completed lab itself.

## One cumulative lab

This is **one cumulative lab in four stages**, not four independent scripts. [Stage 2](/notes/linux-networking-direct-connections/#section-stage-2-connect-host1-directly-to-host2-with-a-veth-pair) starts from [Stage 1](/notes/linux-networking-isolated-hosts/#section-stage-1-create-two-isolated-hosts-and-understand-lo). [Stage 3](/notes/linux-networking-switched-lan/#section-stage-3-replace-the-cable-with-a-three-host-switched-lan) replaces the direct cable built in [Stage 2](/notes/linux-networking-direct-connections/#section-stage-2-connect-host1-directly-to-host2-with-a-veth-pair). [Stage 4](/notes/linux-networking-routing-between-subnets/#section-stage-4-add-a-router-and-a-second-subnet) extends [Stage 3](/notes/linux-networking-switched-lan/#section-stage-3-replace-the-cable-with-a-three-host-switched-lan) without removing its three-host LAN.

You will enter individual commands. There are no helper functions hiding the networking operations.

An **architecture** describes which objects exist, how they connect, and which object is responsible for each decision. The same tools can create different architectures. Do not learn a command sequence without knowing which architecture it produces.

Stop at each **Predict → Observe → Explain** checkpoint. Read the explanation, make a prediction, run only the current step, and compare its result with the expected observation.

Keep the same Linux environment between lessons. Lesson 1 creates a temporary web directory recorded in the shell variable `LAB_WEB`; Lesson 3 reuses it, and Lesson 4 removes it. Each lesson states which namespaces must exist and which processes must be stopped. If you finish early, follow [the cleanup instructions](/notes/linux-networking-routing-between-subnets/#section-cleanup-remove-only-the-resources-you-created) for only the resources you created.

## Offline course and reference

[Open or save the complete self-contained HTML course](/notes/linux-networking/linux-networking-course.html), including all ten diagrams and expandable answers. This is the original continuous edition; its Parts I-IV correspond to material reorganized across these lessons.

The [complete command reference](/notes/linux-networking-routing-between-subnets/#section-a-compact-command-reference) and [source documentation and supplied validation record](/notes/linux-networking-routing-between-subnets/#section-sources-and-validation) are in Lesson 4.

[Start Lesson 1: Interfaces, namespaces, and loopback](/notes/linux-networking-isolated-hosts/)
