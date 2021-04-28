//
//  ContentView.swift
//  StyleDictionaryDarkModeDemo
//
//  Created by Banks, Daniel on 3/10/21.
//  Copyright © 2021 Amazon. All rights reserved.
//

import SwiftUI

extension UINavigationController {
    override open func viewDidLoad() {
        super.viewDidLoad()

    let standard = UINavigationBarAppearance()
        if #available(iOS 14.0, *) {
            standard.backgroundColor = UIColor(Color.backgroundPrimary)
        } else {
            // Fallback on earlier versions
        }
        //When you scroll or you have title (small one)

    let compact = UINavigationBarAppearance()
    if #available(iOS 14.0, *) {
        compact.backgroundColor = UIColor(Color.backgroundPrimary) //compact-height
    }

    let scrollEdge = UINavigationBarAppearance()
    if #available(iOS 14.0, *) {
        scrollEdge.backgroundColor = UIColor(Color.backgroundPrimary) //When you have large title
    }

    navigationBar.standardAppearance = standard
    navigationBar.compactAppearance = compact
    navigationBar.scrollEdgeAppearance = scrollEdge
 }
}

struct ContentView: View {
    init() {
        if #available(iOS 14.0, *) {
            UITableView.appearance().backgroundColor = UIColor(Color.backgroundPrimary)
        } else {
            // Fallback on earlier versions
        } // Uses UIColor
    }
    var body: some View {
        TabView {
            HomeView().tabItem {
                Image(systemName: "paperplane")
                Text("Home")
            }
            TokensView().tabItem {
                Image(systemName: "slider.horizontal.3")
                Text("Tokens")
            }
            ComponentsListView().tabItem {
                Image(systemName: "shippingbox")
                Text("Components")
            }
            GraphicsView().tabItem {
                Image(systemName: "wand.and.stars")
                Text("Graphics")
            }
        }.accentColor(Color.fontInteractive)
        .background(Color.backgroundPrimary)
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
