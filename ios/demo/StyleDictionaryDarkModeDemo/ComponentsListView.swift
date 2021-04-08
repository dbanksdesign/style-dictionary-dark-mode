//
//  ComponentsListView.swift
//  StyleDictionaryDarkModeDemo
//
//  Created by Banks, Daniel on 3/10/21.
//  Copyright © 2021 Amazon. All rights reserved.
//

import Foundation
import SwiftUI

struct ComponentsListView: View {
    var body: some View {
        NavigationView {
            List() {
                NavigationLink(destination: ButtonsView()) {
                    Text("Buttons")
                }
                NavigationLink(destination: BadgesView()) {
                    Text("Badges")
                }
            }.navigationBarTitle("Components")
        }.navigationViewStyle(StackNavigationViewStyle())
    }
}
